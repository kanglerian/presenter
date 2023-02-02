const fs = require('fs');
const moment = require('moment');
const express = require('express');
const PDFDocument = require('pdfkit-table');
const Validator = require('fastest-validator');
const readXlsxFile = require('read-excel-file/node')
const { Op } = require("sequelize");
const router = express.Router();

const Auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadExcel');
const { phoneNumberFormatter } = require('../helpers/formatter');

const { School } = require('../models');

moment.locale('id');

const v = new Validator();

const schemaAdd = {
  name: 'string|empty:false',
  teacher: 'string|empty:false',
  address: 'string|empty:false',
  contact: 'string|optional',
  status: 'boolean',
}

router.get('/', Auth.checkLogin, async (req, res) => {
  const session_store = req.session;
  const data = await School.findAll();
  const active = await School.findAll({ where: { status: true } });
  const nonActive = await School.findAll({ where: { status: false } });
  return res.render('pages/schools/index', {
    layout: 'layouts/dashboard',
    user: session_store,
    schools: data,
    validates: req.flash('validates'),
    message: req.flash('message'),
    url: req.baseUrl,
    active: active,
    nonActive: nonActive,
    moment: moment
  });
});

router.get('/detail/:id', Auth.checkLogin, async (req, res) => {
  const session_store = req.session;
  const data = await School.findOne({
    where: {
      id: req.params.id
    }
  });
  return res.render('pages/schools/detail', {
    layout: 'layouts/dashboard',
    user: session_store,
    schools: data,
    validates: req.flash('validates'),
    message: req.flash('message'),
    url: req.baseUrl,
    moment: moment
  });
});


router.post('/report', Auth.checkLogin, async (req, res) => {
  const data = await School.findAll({
    where: {
      createdAt: {
        [Op.between]: [`${req.body.datefrom}`, `${req.body.dateto}`]
      }
    }
  });
  let schools = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {
      no: i + 1,
      name: data[i].name,
      teacher: data[i].teacher,
      contact: data[i].contact,
      address: data[i].address,
      status: data[i].status,
      partnership: data[i].createdAt,
    }
    schools.push(obj)
  }
  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  doc.pipe(res);
  doc.image('public/images/lp3i.png', {
    fit: [150, 150],
    margin: 50,
  });
  doc.moveDown();
  ; (async function () {
    const table = {
      title: "Daftar Sekolah Kerjasama",
      subtitle: "Politeknik LP3I Kampus Tasikmalaya",
      headers: [
        { label: "No", property: 'no', width: 25, renderer: null },
        { label: "Name", property: 'name', width: 110, renderer: null },
        { label: "Teacher", property: 'teacher', width: 80, renderer: null },
        { label: "Contact", property: 'contact', width: 70, renderer: null },
        { label: "Address", property: 'address', width: 130, renderer: null },
        { label: "Partnership", property: 'partnership', width: 70, renderer: (value) => { return `${moment(value).format('LL')}` } },
        { label: "Status", property: 'status', width: 50, renderer: (value) => { return `${value == true ? 'Aktif' : 'Tidak aktif'}` } },
      ],
      datas: schools,
    };
    doc.table(table, {
      padding: 5,
      columnSpacing: 5,
      divider: {
        header: { disabled: false, width: 1, opacity: 1 },
        horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
      },
      prepareHeader: () => doc.fontSize(8),
      prepareRow: () => doc.fontSize(8),
    });
    let tanggal = new Date();
    doc.text(`Diunduh pada: ${moment(tanggal).format('LLLL')}`);
    doc.end();
  })();
  return res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="schools-report-lp3i.pdf"',
  });
});

router.post('/upload', Auth.checkLogin, upload.single('upload'), async (req, res) => {
  let schools = [];
  readXlsxFile('public/uploads' + `/${req.file.filename}`).then(async (rows) => {
    rows.shift();
    rows.forEach((row) => {
      var obj = {
        name: row[1],
        teacher: row[2],
        address: row[3],
        contact: row[4],
        status: row[5],
      }
      schools.push(obj);
    });
    await School.bulkCreate(schools);
    fs.unlink('public/uploads' + `/${req.file.filename}`, (err) => {
      if (err) throw err;
      console.log('deleted');
    });
    req.flash('message', 'Data telah ditambahkan!');
    return res.redirect('/schools');
  }).catch((err) => {
    console.log(err)
  });
});

router.post('/', Auth.checkLogin, async (req, res) => {
  const validate = v.validate({
    name: req.body.name,
    teacher: req.body.teacher,
    contact: req.body.contact,
    address: req.body.address,
    status: Boolean(req.body.status)
  }, schemaAdd);
  if (validate.length) {
    req.flash('validates', validate);
    return res.redirect('/schools');
  }
  await School.create({
    name: req.body.name,
    teacher: req.body.teacher,
    contact: phoneNumberFormatter(req.body.contact),
    address: req.body.address,
    status: req.body.status
  });
  req.flash('message', 'Data telah ditambahkan!');
  return res.redirect('back');
});

router.patch('/:id', Auth.checkLogin, async (req, res) => {
  const validate = v.validate({
    name: req.body.name,
    teacher: req.body.teacher,
    contact: req.body.contact,
    address: req.body.address,
    status: Boolean(req.body.status),
    createdAt: req.body.createdAt,
  }, schemaAdd);
  if (validate.length) {
    req.flash('validates', validate);
    return res.redirect('/schools');
  }
  await School.update({
    name: req.body.name,
    teacher: req.body.teacher,
    contact: phoneNumberFormatter(req.body.contact),
    address: req.body.address,
    status: req.body.status,
    createdAt: req.body.createdAt,
  }, {
    where: {
      id: req.params.id
    }
  });
  req.flash('message', 'Data telah terupdate!');
  return res.redirect('back');
});

router.delete('/', Auth.checkLogin, async (req, res) => {
  await School.destroy({
    where: {
      id: req.body.id
    }
  });
  req.flash('message', 'Data telah dihapus!');
  return res.redirect('back');

});

module.exports = router;

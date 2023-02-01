const express = require('express');
const Validator = require('fastest-validator');
const router = express.Router();

const { phoneNumberFormatter } = require('../helpers/formatter');

const { School } = require('../models');

const v = new Validator();

const schemaAdd = {
  name: 'string|empty:false',
  teacher: 'string|empty:false',
  address: 'string|empty:false',
  contact: 'string|optional',
  status: 'boolean'
}

router.get('/', async (req, res) => {
  const session_store = req.session;
  const data = await School.findAll();
  return res.render('pages/schools/index', {
    layout: 'layouts/dashboard',
    user: session_store,
    schools: data,
    validates: req.flash('validates'),
    message: req.flash('message'),
    url: req.originalUrl,
  });
});

router.get('/detail/:id', async (req, res) => {
  const session_store = req.session;
  const data = await School.findOne({
    where: {
      id: req.params.id
    }
  });
  return res.render('pages/schools/detail', {
    layout: 'layouts/dashboard',
    user: session_store,
    school: data,
    validates: req.flash('validates'),
    message: req.flash('message')
  });
});

router.post('/', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
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
  await School.update({
    name: req.body.name,
    teacher: req.body.teacher,
    contact: phoneNumberFormatter(req.body.contact),
    address: req.body.address,
    status: req.body.status
  }, {
    where: {
      id: req.params.id
    }
  });
  req.flash('message', 'Data telah terupdate!');
  return res.redirect('back');
});

router.delete('/', async (req, res) => {
  await School.destroy({
    where: {
      id: req.body.id
    }
  });
  req.flash('message', 'Data telah dihapus!');
  return res.redirect('back');

});

module.exports = router;

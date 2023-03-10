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

const { User, School } = require('../models');

moment.locale('id');

const v = new Validator();

const schema = {
  email: 'email|empty:false',
  password: 'string|min:6'
}

const schemaUpdate = {
  fullName: 'string|empty:false',
  role: 'boolean|empty:false',
  email: 'email|empty:false',
  password: 'string|min:6',
  status: 'boolean|empty:false',
}

router.get('/', async (req, res) => {
  const session_store = req.session;
  const schools = await School.findAll();
  const presenters = await User.findAll();
  const active = await User.findAll({ where: { status: true } });
  const nonActive = await User.findAll({ where: { status: false } });
  return res.render('pages/users/index', {
    layout: 'layouts/dashboard',
    user: session_store,
    presenters: presenters,
    schools: schools,
    validates: req.flash('validates'),
    message: req.flash('message'),
    url: req.baseUrl,
    active: active,
    nonActive: nonActive,
    moment: moment
  });
});

router.get('/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'fullName', 'role', 'email', 'status']
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  return res.json({
    status: 'success',
    presenter: user
  });
});

router.post('/', async (req, res) => {
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user) {
    return res.status(409).json({
      status: 'error',
      message: 'email already exist'
    });
  }
  const createdUser = await User.create(req.body);
  return res.json({
    status: 'success',
    data: createdUser.id
  });
});


router.patch('/:id', async (req, res) => {
  const validate = v.validate(req.body, schemaUpdate);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({
      where: {
        email: email
      }
    });
    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: 'error',
        message: 'email already exist'
      });
    }
  }
  await User.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  return res.json({
    status: 'success'
  });
});

router.delete('/', async (req, res) => {
  await User.destroy({
    where: {
      id: req.body.id
    }
  });
  return res.json({
    status: 'success'
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/auth');

const { School } = require('../models');

/* GET home page. */
router.get('/', async (req, res) => {
  const session_store = req.session;
  const data = await School.findAll();
  return res.render('index', {
    layout: 'layouts/dashboard',
    schools: data,
    user: session_store,
    url: req.originalUrl,
  });
});

module.exports = router;

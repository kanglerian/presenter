const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/auth');

const { School } = require('../models');

/* GET home page. */
router.get('/', Auth.checkLogin, (req, res) => {
  const session_store = req.session;
  res.render('pages/schools/index', {
    layout: 'layouts/dashboard',
    user: session_store,
    message: req.flash('message')
  });
});

module.exports = router;

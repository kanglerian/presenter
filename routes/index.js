const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const session_store = req.session;
  res.render('index', {
    layout: 'layouts/test',
    title: session_store,
    message: req.flash('auth')
  });
});

module.exports = router;

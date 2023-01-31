const express = require('express');
const Validator = require('fastest-validator');
const router = express.Router();
const Auth = require('../../middlewares/auth');

const { User } = require('../../models');

const v = new Validator();

const schemaLogin = {
  email: 'email|empty:false'
}

const schemaRegister = {
  fullName: 'string|empty:false',
  email: 'email|empty:false',
  password: 'string|min:6'
}

router.get('/', Auth.authLogin, async (req, res) => {
  const session_store = req.session;
  return res.render('pages/auth/login', {
    layout: 'layouts/auth',
    user: session_store,
    validates: req.flash('validates'),
    message: req.flash('message'),
  });
});

router.get('/register', Auth.authLogin, async (req, res) => {
  const session_store = req.session;
  return res.render('pages/auth/register', {
    layout: 'layouts/auth',
    user: session_store,
    validates: req.flash('validates'),
    message: req.flash('message'),
  });
});

router.post('/login', async (req, res) => {
  const session_store = req.session;
  const validate = v.validate(req.body, schemaLogin);
  if (validate.length) {
    req.flash('validates', validate);
    return res.redirect('/auth');
  }
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) {
    req.flash('message', 'User not found!');
    return res.redirect('/auth');
  }
  if (req.body.password != user.password) {
    req.flash('message', 'Wrong password!');
    return res.redirect('/auth');
  }
  session_store.no_id = user.id;
  session_store.fullName = user.fullName;
  session_store.email = user.email;
  session_store.role = user.role;
  session_store.status = user.status;
  session_store.logged = true;
  req.flash('message', 'Login success!');
  return res.redirect('/');
});

router.post('/register', async (req, res) => {
  const session_store = req.session;
  const validate = v.validate(req.body, schemaRegister);
  if (validate.length) {
    req.flash('validates', validate);
    return res.redirect('/auth/register');
  }
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user) {
    req.flash('message', 'Email already exist!');
    return res.redirect('/auth/register');
  }
  let data = {
    fullName: req.body.fullName,
    role: 0,
    email: req.body.email,
    password: req.body.password,
    status: 0,
  }
  const createdUser = await User.create(data);
  session_store.no_id = createdUser.id;
  session_store.fullName = createdUser.fullName;
  session_store.email = createdUser.email;
  session_store.role = createdUser.role;
  session_store.status = createdUser.status;
  session_store.logged = true;
  req.flash('message', 'Register success!');
  return res.redirect('/');
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.redirect('/');
    }
    return res.redirect('back');
  });
});

module.exports = router;

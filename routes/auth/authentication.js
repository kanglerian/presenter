const express = require('express');
const Validator = require('fastest-validator');
const router = express.Router();
const Auth = require('../../middlewares/auth');

const { User } = require('../../models');

const v = new Validator();

const schemaLogin = {
  email: 'email|empty:false',
  password: 'string|min:6'
}

const schemaRegister = {
  fullName: 'string|empty:false',
  email: 'email|empty:false',
  password: 'string|min:6'
}

router.get('/', Auth.authLogin, async(req, res) => {
  res.render('pages/auth/login',{
    layout: 'layouts/test'
  });
});

router.get('/register', Auth.authLogin, async(req, res) => {
  res.render('pages/auth/register',{
    layout: 'layouts/test'
  });
});

router.post('/login', async (req, res) => {
  const session_store = req.session;
  const validate = v.validate(req.body, schemaLogin);
  if(validate.length){
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
  if(!user){
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  if(req.body.password != user.password){
    return res.status(404).json({
      status: 'error',
      message: 'wrong password'
    });
  }
  session_store.no_id = user.id;
  session_store.fullName = user.fullName;
  session_store.email = user.email;
  session_store.role = user.role;
  session_store.status = user.status;
  session_store.logged = true;
  req.flash('auth', 'Login success!');
  return res.redirect('/');
});

router.post('/register', async (req, res) => {
  const session_store = req.session;
  const validate = v.validate(req.body, schemaRegister);
  if(validate.length){
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
  req.flash('auth', 'Register success!');
  return res.redirect('/');
});

router.get('/logout', async(req, res) => {
  req.session.destroy((err) => {
    if(err){
      alert('Gagal logout');
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;

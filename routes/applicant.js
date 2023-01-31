let express = require('express');
let router = express.Router();

const { Applicant, User, School, Profession } = require('../models');

router.get('/', async (req, res) => {
  try {
    const data = await Applicant.findAll({
      include: [
        {model: User, attributes:['id','fullName']},
        {model: School, attributes:['id','name','teacher']},
        {model: Profession, as: 'Father', attributes:['id','name']},
        {model: Profession, as: 'Mother', attributes:['id','name']},
      ]
    });
    return res.json({
      message: 'data successfully loaded.',
      data: data,
      cek: refreshToken
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Applicant.findOne({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'data successfully loaded.',
      applicant: data
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});

router.post('/', async (req, res) => {
  try {
    await Applicant.create(req.body);
    res.json({
      message: 'data has been added.'
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    await Applicant.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'data has been updated.'
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    await Applicant.destroy({
      where: {
        id: req.body.id
      }
    });
    return res.json({
      message: 'data has been deleted.'
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});

module.exports = router;

let express = require('express');
let router = express.Router();

const { SocialMedia, Applicant, ApplicantSocmed } = require('../models');

router.get('/', async (req, res) => {
  try {
    const data = await ApplicantSocmed.findAll({
      include: [
        {model: SocialMedia, attributes:['id','name']},
        {model: Applicant, attributes:['id','fullName']},
      ]
    });
    return res.json({
      message: 'data successfully loaded.',
      data: data
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await ApplicantSocmed.findOne({
      where: {
        id: req.params.id
      }
    });
    return res.json({
      message: 'data successfully loaded.',
      presenter: data
    });
  } catch (error) {
    return res.json({
      status: error
    });
  }
});

router.post('/', async (req, res) => {
  try {
    await ApplicantSocmed.create(req.body);
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
    await ApplicantSocmed.update(req.body,{
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
    await ApplicantSocmed.destroy({
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

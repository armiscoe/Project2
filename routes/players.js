var express = require('express');
var router = express.Router();
var playersCtrl = require('../controllers/players')
const UserModel = require('../models/userModel')
const asyncMiddleware = require('../middleware/asyncMiddleware');

/* GET users listing. */


router.post('/signup', asyncMiddleware( async (req, res, next) => {
  const { name, email, password } = req.body;
  await UserModel.create({ email, password, name });
  res.status(200).json({ 'status': 'ok' });
}));

router.post('/login', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
 
router.post('/logout', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
 
router.post('/token', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});

module.exports = router;

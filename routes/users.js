const express = require('express');
const router = express.Router();
const {
  createUser,
  checkIsAdmin,
  updateOrInsertUser,
  makeAdmin,
} = require('../controllers/usersController');

router.route('/').post(createUser).patch(updateOrInsertUser);
router.route('/:email').get(checkIsAdmin);
router.route('/admin').patch(makeAdmin);

module.exports = router;

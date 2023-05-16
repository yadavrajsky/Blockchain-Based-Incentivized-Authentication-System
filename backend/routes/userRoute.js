const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/userController');

// const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
// const { logoutUser } = require('../utils/contractMethodsProvider');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;
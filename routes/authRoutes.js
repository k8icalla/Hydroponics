const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup routes
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.signup);

// Login routes
router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;

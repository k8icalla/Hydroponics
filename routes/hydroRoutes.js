const express = require('express');
const hydroController = require('../controllers/hydroController');

const router = express.Router();

// Route mappings
router.get('/', hydroController.getIndex);      // Home page
router.get('/login', hydroController.getLogin);  // Login page
router.get('/signup', hydroController.getSignup); // Signup page
router.get('/controller', hydroController.getController); // Controller page

module.exports = router;
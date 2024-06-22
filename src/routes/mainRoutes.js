const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Rota para a página inicial
router.get('/', mainController.getHome);

module.exports = router;
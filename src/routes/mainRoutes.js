const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const mainController = require('../controllers/mainController');
const Transaction = require('../models/Transaction');

// Rota para a página inicial
router.get('/', mainController.getHome);

module.exports = router;
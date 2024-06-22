const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const mainController = require('../controllers/mainController');
const Transaction = require('../models/Transaction');

router.get('/telaDeInicio', requireAuth, (req, res) => {
    const transactions = Transaction.findAll({ where: { userId: req.session.userId } });
    res.render('telaDeInicio', { user: req.user, transactions: transactions });
});

// Rota para a página inicial
router.get('/', mainController.getHome);

module.exports = router;
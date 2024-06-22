const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/telaDeInicio', requireAuth, transactionController.getTelaDeInicio);
router.post('/transactions', requireAuth, transactionController.createTransaction);
router.get('/transactions/new', requireAuth, transactionController.newTransactionForm);
router.post('/transactions/delete/:id', requireAuth, transactionController.deleteTransaction);

module.exports = router;

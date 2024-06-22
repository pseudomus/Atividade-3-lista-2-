const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

exports.getTelaDeInicio = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { userId: req.session.userId } });
        res.render('telaDeInicio', {
            user: { username: req.session.username },
            transactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Erro ao buscar transações');
    }
};

exports.createTransaction = [
    body('amount').isNumeric().withMessage('O valor deve ser um número'),
    body('description').trim().notEmpty().withMessage('Descrição é obrigatória'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.render('newTransaction', { errors: errors.array() });
        }

        const { amount, description } = req.body;

        try {
            await Transaction.create({
                amount,
                description,
                userId: req.session.userId,
            });

            res.redirect('/telaDeInicio');
        } catch (error) {
            console.error('Error creating transaction:', error);
            res.status(500).send('Erro ao criar transação');
        }
    }
];

exports.newTransactionForm = (req, res) => {
    res.render('newTransaction', { errors: [] });
};

exports.deleteTransaction = async (req, res) => {
    const transactionId = req.params.id;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (transaction) {
            await transaction.destroy();
            res.redirect('/telaDeInicio');
        } else {
            res.status(404).send('Transação não encontrada');
        }
    } catch (error) {
        console.error('Erro ao excluir a transação:', error);
        res.status(500).send('Erro ao excluir a transação');
    }
};

exports.getEditTransaction = async (req, res) => {
    const transactionId = req.params.id;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (transaction) {
            res.render('editTransaction', { transaction: transaction.toJSON() });
        } else {
            res.status(404).send('Transação não encontrada');
        }
    } catch (error) {
        console.error('Erro ao carregar a transação:', error);
        res.status(500).send('Erro ao carregar a transação');
    }
};

exports.postEditTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const { amount, description } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (transaction) {
            transaction.amount = amount;
            transaction.description = description;
            await transaction.save();
            res.redirect('/telaDeInicio');
        } else {
            res.status(404).send('Transação não encontrada');
        }
    } catch (error) {
        console.error('Erro ao atualizar a transação:', error);
        res.status(500).send('Erro ao atualizar a transação');
    }
};
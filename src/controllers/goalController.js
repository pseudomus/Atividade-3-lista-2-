const FinancialGoal = require('../models/FinancialGoal');

exports.getCreateGoal = (req, res) => {
    res.render('newGoal');
};

exports.postCreateGoal = async (req, res) => {
    const { name, targetAmount, currentAmount, deadline } = req.body;
    const userId = req.user.id;

    try {
        await FinancialGoal.create({
            name,
            targetAmount,
            currentAmount,
            deadline,
            userId
        });
        res.redirect('/telaDeInicio');
    } catch (error) {
        console.error('Erro ao criar a meta:', error);
        res.status(500).send('Erro ao criar a meta');
    }
};

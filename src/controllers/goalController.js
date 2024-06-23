const FinancialGoal = require('../models/FinancialGoal');

exports.getCreateGoal = (req, res) => {
    res.render('newGoal');
};

exports.postCreateGoal = async (req, res) => {
    const { description, targetAmount } = req.body;
    const userId = req.user.id;

    try {
        await FinancialGoal.create({
            description,
            targetAmount,
            userId,
        });
        res.redirect('/telaDeInicio');
    } catch (error) {
        console.error('Erro ao criar a meta:', error);
        res.status(500).send('Erro ao criar a meta');
    }
};

exports.getEditGoal = async (req, res) => {
    try {
        const goal = await FinancialGoal.findOne({ where: { userId: req.user.id } });
        if (goal) {
            res.render('editGoal', { goal: goal.toJSON() });
        } else {
            res.redirect('/goals/new');
        }
    } catch (error) {
        console.error('Erro ao carregar a meta:', error);
        res.status(500).send('Erro ao carregar a meta');
    }
};

exports.postEditGoal = async (req, res) => {
    try {
        const { description, targetAmount } = req.body;
        const goal = await FinancialGoal.findOne({ where: { userId: req.user.id } });
        if (goal) {
            await goal.update({ description, targetAmount });
            res.redirect('/telaDeInicio');
        } else {
            res.redirect('/goals/new');
        }
    } catch (error) {
        console.error('Erro ao atualizar a meta:', error);
        res.status(500).send('Erro ao atualizar a meta');
    }
};

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getEditUser = (req, res) => {
    res.render('editUser', { user: req.user, errors: null });
};

exports.postEditUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const updateData = { username, email };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        await User.update(updateData, { where: { id: req.user.id } });
        req.session.username = username;
        res.redirect('/telaDeInicio');
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        const errors = error.errors ? error.errors.map(err => err.message) : ['Erro ao atualizar usuário'];
        res.render('editUser', { user: req.user, errors });
    }
};

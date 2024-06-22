const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.getLogin = (req, res) => {
    res.render('login', { errors: [] });
};

exports.postLogin = [
    body('email').trim().isEmail().withMessage('Email inválido'),
    body('password').trim().notEmpty().withMessage('Password é obrigatório'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.render('login', { errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.render('login', { errors: [{ msg: 'Email não encontrado' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render('login', { errors: [{ msg: 'Password incorreto' }] });
            }

            req.session.userId = user.id; // Armazena o ID do usuário na sessão
            res.redirect('/telaDeInicio');
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).send('Erro ao fazer login');
        }
    }
];

exports.getRegister = (req, res) => {
    res.render('register', { errors: [] });
};

exports.postRegister = [
    body('username').trim().notEmpty().withMessage('Username é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Password deve ter pelo menos 6 caracteres'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.render('register', { errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Verificar se o email já está em uso
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                console.log('Email already in use:', email);
                return res.render('register', { errors: [{ msg: 'Email já está em uso' }] });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Criar novo usuário
            await User.create({
                username,
                email,
                password: hashedPassword,
            });

            console.log('User registered successfully:', username);
            res.redirect('/login');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Erro ao criar usuário');
        }
    }
];

exports.updateProfile = [
    body('username').trim().notEmpty().withMessage('Nome de usuário é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.render('telaDePerfil', { errors: errors.array() });
        }

        const { username, email, password } = req.body;
        const userId = req.session.userId; // Supondo que o ID do usuário é armazenado na sessão

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                console.log('User not found:', userId);
                return res.render('telaDePerfil', { errors: [{ msg: 'Usuário não encontrado' }] });
            }

            // Verificar se o email já está em uso por outro usuário
            const existingEmail = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
            if (existingEmail) {
                console.log('Email already in use:', email);
                return res.render('telaDePerfil', { errors: [{ msg: 'Email já está em uso' }] });
            }

            if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 10);

            await user.save();

            console.log('User profile updated successfully:', username);
            res.redirect('/');
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).send('Erro ao atualizar perfil');
        }
    }
];
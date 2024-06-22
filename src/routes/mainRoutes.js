const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const path = require('path');

router.get('/telaDeInicio', requireAuth, (req, res) => {
    res.render('telaDeInicio', { user: req.user });
});

router.get('/ajustes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'telaDePerfil.html'));
});

module.exports = router;

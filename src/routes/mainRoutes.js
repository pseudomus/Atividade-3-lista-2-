const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const mainController = require('../controllers/mainController');

router.get('/telaDeInicio', requireAuth, (req, res) => {
    res.render('telaDeInicio', { user: req.user });
});

// Rota para a página inicial
router.get('/', mainController.getHome);

module.exports = router;
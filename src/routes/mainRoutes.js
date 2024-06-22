const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/telaDeInicio', requireAuth, (req, res) => {
    res.render('telaDeInicio', { user: req.user });
});

module.exports = router;

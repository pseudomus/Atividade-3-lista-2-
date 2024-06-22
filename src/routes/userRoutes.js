const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/user/edit', requireAuth, userController.getEditUser);
router.post('/user/edit', requireAuth, userController.postEditUser);

module.exports = router;

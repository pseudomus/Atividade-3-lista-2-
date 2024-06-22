const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/goals/new', requireAuth, goalController.getCreateGoal);
router.post('/goals/new', requireAuth, goalController.postCreateGoal);

module.exports = router;

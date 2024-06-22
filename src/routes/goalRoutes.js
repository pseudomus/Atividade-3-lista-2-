const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/goals/new', requireAuth, goalController.getCreateGoal);
router.post('/goals/new', requireAuth, goalController.postCreateGoal);

router.get('/goals/edit', requireAuth, goalController.getEditGoal);
router.post('/goals/edit', requireAuth, goalController.postEditGoal);

module.exports = router;

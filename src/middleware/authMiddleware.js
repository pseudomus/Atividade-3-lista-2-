const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    const userId = req.session.userId;
    if (userId) {
        try {
            const user = await User.findByPk(userId);
            if (user) {
                req.user = user;
                next();
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = { requireAuth };

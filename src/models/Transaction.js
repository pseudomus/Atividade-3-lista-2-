const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    description: {
        type: DataTypes.TEXT,
    },
    
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true, 
});

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = Transaction;

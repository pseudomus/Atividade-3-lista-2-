const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const FinancialGoal = sequelize.define('FinancialGoal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    targetAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    timestamps: true, // Adiciona automaticamente campos `createdAt` e `updatedAt`
});

// Definindo a associação
User.hasMany(FinancialGoal, { foreignKey: 'userId' });
FinancialGoal.belongsTo(User, { foreignKey: 'userId' });

module.exports = FinancialGoal;

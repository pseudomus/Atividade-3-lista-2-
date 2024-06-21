const { DataTypes } = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario');

const Meta = database.define('meta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    targetAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
        allowNull: false,
    }

});

module.exports = Meta;
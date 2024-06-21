const { DataTypes } = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario');

const Transacao = database.define('transacao', {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
    },

    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    tipo: {
        type: DataTypes.STRING,
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

module.exports = Transacao;
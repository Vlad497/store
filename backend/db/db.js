const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'online_store',
    'postgres',
    'root',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
);
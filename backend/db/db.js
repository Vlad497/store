const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'internet_portal',
    'postgres',
    'root',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
);
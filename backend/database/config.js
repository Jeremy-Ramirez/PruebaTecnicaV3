const { Sequelize } = require('sequelize');

const dbConntection = new Sequelize(
    'pruebatecnica2',
    'root',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        // logging: false,
    }
);



module.exports = {
    dbConntection
}
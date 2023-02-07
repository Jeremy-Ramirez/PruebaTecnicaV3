const { DataTypes } = require('sequelize');
const { dbConntection } = require('../database/config');

const User = dbConntection.define('users', {

    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
   
}, {
    timestamps:true
}
)

module.exports = {
    User
};
const { DataTypes } = require('sequelize');
const { dbConntection } = require('../database/config');
const { User } = require('./user');

const Token= dbConntection.define('tokens', {

    idToken: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Token: { type: DataTypes.STRING },
   

}, {
    timestamps:true
});


User.hasMany(Token,{
    foreignKey: 'User_id',
    sourceKey:'id'
})

Token.belongsTo(User,{
    foreignKey: 'idToken',
    targetId:'id'
})


module.exports = {
    Token
};
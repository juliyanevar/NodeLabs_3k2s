const Sequelize = require('sequelize');
const sequelize = new Sequelize('NJV', 'sa', '123456', {host: 'DESKTOP-QCIHU10', dialect: 'mssql'});

module.exports=sequelize;
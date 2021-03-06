const sequelize = require("../db_connection.js");
const {FACULTY, PULPIT, TEACHER, SUBJECT, AUDITORIUM_TYPE, AUDITORIUM}=require('..\\models\\db_schema').ORM(sequelize);

exports.addPulpit = function (request, response){
    PULPIT.create({PULPIT: request.query.pulpit, PULPIT_NAME: request.query.pname, FACULTY: request.query.faculty})
        .catch((err)=>console.log('Error: '+ err.message));
    response.send("Добавление кафедры");
};
exports.getPulpits = function(request, response){
    PULPIT.findAll().then(rec=>response.send(JSON.stringify(rec)))
        .catch((err)=>console.log('Error: '+ err.message));
};

exports.updatePulpit=function(request, response){
    PULPIT.update(
        {PULPIT_NAME: request.query.pname,
            FACULTY: request.query.faculty},
        {where: {PULPIT: request.query.pulpit}}
    ).catch((err)=>console.log('Error: '+ err.message));
    response.send('Изменение кафедры');
}

exports.deletePulpit=function (request, response){
    PULPIT.destroy({where:{PULPIT: request.query.pulpit}})
        .catch((err)=>console.log('Error: '+ err.message));
    response.send('Удаление кафедры');
}
const sequelize = require("../db_connection.js");
const {FACULTY, PULPIT, TEACHER, SUBJECT, AUDITORIUM_TYPE, AUDITORIUM}=require('..\\models\\db_schema').ORM(sequelize);

exports.addFaculty = function (request, response){
    FACULTY.create({FACULTY: request.query.faculty, FACULTY_NAME: request.query.fname})
        .catch((err)=>console.log('Error: '+ err.message));
    response.send("Добавление факультета");
};
exports.getFaculties = function(request, response){
    FACULTY.findAll().then(rec=>response.send(JSON.stringify(rec)))
        .catch((err)=>console.log('Error: '+ err.message));
};

exports.updateFaculty=function(request, response){
    FACULTY.update(
        {FACULTY_NAME: request.query.fname},
        {where: {FACULTY: request.query.faculty}}
    ).catch((err)=>console.log('Error: '+ err.message));
    response.send('Изменение факультета');
}

exports.deleteFaculty=function (request, response){
    FACULTY.destroy({where:{FACULTY: request.query.faculty}})
        .catch((err)=>console.log('Error: '+ err.message));
    response.send('Удаление факультета');
}
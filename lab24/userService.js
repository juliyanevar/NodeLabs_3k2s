const jwt = require('jsonwebtoken');
const secret = '123456789';

const users = require('./user');

module.exports = {authenticate, getAll, getById};

async function authenticate({ username, password}){
    const user = users.find(u=>u.username===username && u.password===password);
    if(user){
        const token = jwt.sign({id:user.id, role: user.role}, secret);
        const { password, ...userWithoutPassword}=user;
        return {...userWithoutPassword, token};
    }
}

async function getAll(){
    return users.map(u=>{
        const {password, ...userWithoutPassword}=u;
        return userWithoutPassword;
    });
}

async function getById(id){
    const user = users.find(u=>u.id===parseInt(id));
    if(!user) return;
    return user;
}
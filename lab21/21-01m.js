const Users = require('./Users.json');

const getCredential = (user)=>{
    return Users.find((e)=>{
        console.log('Is ver login ' + (e.user.toUpperCase() == user.toUpperCase()));
        return e.user.toUpperCase() == user.toUpperCase(); });
};

const verPassword = (pass1, pass2)=>{
    console.log('Is ver password ' + (pass1 == pass2));
    return pass1 == pass2;};

module.exports = {
    getCredential:getCredential,
    verPassword:verPassword
};
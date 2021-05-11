const Role = require('./role');

class User{
    constructor(id, username, password, role) {
        this.id=id;
        this.username=username;
        this.password=password;
        this.role=role;
    }
    static get modelName(){
        return 'User'
    }
}

const users = [
    new User(1, 'admin', 'admin', Role.Admin),
    new User(2, 'user', 'user', Role.User)
];

module.exports = users;
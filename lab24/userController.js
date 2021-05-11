const userService = require('./userService');
const router = require('express').Router();

router.post('/authenticate', authenticate);
router.get('/', getAll);
router.get('/:id', getById);

function authenticate(req, res, next){
    userService.authenticate(req.body)
        .then(user=>user?res.json(user):res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err=>next(err));
}

function getAll(req, res, next){
    userService.getAll()
        .then(users =>{
            req.ability.throwUnlessCan('read', users);
            res.json(users);
        })
        .catch(err=>next(err));
}

function getById(req, res, next){
    userService.getById(req.params.id)
        .then(user=>{
            req.ability.throwUnlessCan('read', user);
            if(!user) res.status(404).json({message: 'Not found'});
            else {
                const {password, ...userWithoutPassword} = user;
                res.json(userWithoutPassword);
            }
        })
        .catch(err=>next(err));
}
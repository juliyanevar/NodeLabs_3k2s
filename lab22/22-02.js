const express = require('express'),
    app=express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    users = require('./Users.json');

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

app.use(bodyParser.json());
app.use((req, res, next) => {
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization.split(' ')[1], tokenKey, (err, payload) => {
            if(err) next();
            else if(payload){
                req.payload = payload;
                next();
            }
        })
    }
    next();
});

app.post('/api/auth', (req, res) => {
    for(let user of users){
        if(req.body.login === user.login && req.body.password === user.password){
            return res.status(200).json({
                id: user.id,
                login: user.login,
                token: jwt.sign({id: user.id, login: user.login}, tokenKey),
            });
        }
    }
    return res.status(404).json({message: 'User not found'});
});

app.get('/user', (req, res) => {
    if(req.payload) return req.status(200).json(req.payload);
    else return res.status(401).json({message: 'Not authorized'});
})

app.listen(3000, () => console.log('http://localhost:3000/login'));
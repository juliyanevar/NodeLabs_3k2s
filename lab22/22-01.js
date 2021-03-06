const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    users = require('./Users.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: '123'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
    new localStrategy((username, password, done) => {
        for (let user of users) {
            if (username === user.login && password === user.password)
                return done(null, user);
        }
        return done(null, false, {message: 'Wrong login or password'});
    })
);

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/22-01.html');
});

app.post('/login', passport.authenticate('local', {successRedirect: '/resource', failureRedirect: '/login'}));

app.get('/resource', (req, res, next)=>{
    if(req.user) next();
    else res.status(401).redirect('/login');
}, (req, res)=>{
    res.send(`<h1>RESOURCE   ${req.user.login}    ${req.user.age}</h1>`);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('*', function(req, res){
    res.status(404).send('ERROR 404: not found ' + req.url);
});

app.listen(3000, () => console.log('http://localhost:3000/login'));

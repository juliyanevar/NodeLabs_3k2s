const app = require('express')();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session')({resave: false, saveUninitialized: false, secret: '321',});

passport.use(new GoogleStrategy({
    clientID: '337288603591-etvpbs41r067nh01aik8166549brg2no.apps.googleusercontent.com',
    clientSecret: '8LDb3Z7zP9uNrbrnyfuXNxKp',
    callbackURL: 'http://localhost:3000/auth/google/callback',
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    })
);

passport.serializeUser((user, done)=>{
    console.log('serialize: displayName');
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    console.log('deserialize: displayName');
    done(null, user);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res)=>{
    res.sendFile(__dirname+'/23-01.html');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("/resource");
    }
);

app.get('/resource', (req, res, next)=>{
    if(req.user) {
        JSON.parse(JSON.stringify(req.user.emails), (key, value) => {

            if (typeof key === 'email') {
                return res.status(200).send('RESOURCE '+value);
            }

            return res.status(200).send('RESOURCE '+value);
        });

    }
    else res.redirect('/login');
});

app.get("/logout", (req, res) => {

    req.session.logout = true;
    req.session.destroy(e => {
        req.logout();
        res.redirect("/login");
    });

});

app.use(function(req, res){
    res.status(404).send('ERROR 404: not found ' + req.url);
});

app.listen(3000, () => console.log('http://localhost:3000/login'));


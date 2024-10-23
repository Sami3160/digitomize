const passport = require('passport');
const session = require('express-session')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt=require('jsonwebtoken')

const passportConfig = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 4
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(
        new GoogleStrategy({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope:["profile", "email" ]
        },function(accessToken, refreshToken, profile, cb) {
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
            const token = jwt.sign({ id: profile.id, email: profile.emails[0].value }, process.env.SESSION_SECRET, { expiresIn: '4h' });
            cb(null, { profile, token });
          } 
    )
    )
    passport.serializeUser((user, cb) => {
        cb(null, user)
    })

    passport.deserializeUser((user, cd)=>{
        cd(null, user)
    })
}


exports.passportConfig = passportConfig;
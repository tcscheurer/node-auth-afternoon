const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategy');
const request = require('request');

const { clientID } = require('./config')

const app = express();
app.use( session({
  secret: 'My-super_dooper..secureSecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user,done)=>{
  done(null, user)
})

passport.deserializeUser((obj,done)=>{
  console.log('DESERIAL: ', obj);
  done(null,obj);
})

app.get('/login',passport.authenticate( 'auth0',
  {
  successRedirect: '/followers',
  failureRedirect: '/login',
  failureFlash: true,
  connection: 'github'
  }
))

app.get('/followers', (req,res)=>{
  if ( req.user ) {
    console.log('USER: ', req.user)
    const FollowersRequest = {
      url: `https://api.github.com/users/${req.user.nickname}/followers`, 
      headers: {
        'User-Agent': clientID
      }
    };

    request(FollowersRequest, ( error, response, body ) => {
      res.status(200).send(body);
    });
  } else {
    console.log('ELSE FIREED')
    res.redirect('/login');
  }
})

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
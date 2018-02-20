const Auth0Strategy = require('passport-auth0');
const config = require(__dirname + '/config');

module.exports = new Auth0Strategy({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: '/login',
    scope: 'openid profile'
},
(accessToken,refreshToken,extraParams,profile,done)=>{
    console.log('PRFILE: ', profile);
     // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null,profile)
}
)
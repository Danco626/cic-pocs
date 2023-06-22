var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

// START - User interactive login endpoints
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Authentication Service',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {    
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

// END - User interactive login endpoints

// START - M2M Routes

const AuthenticationClient = require("auth0").AuthenticationClient;
/**
 * Proxies M2M request to Auth0 and returns an access token with the requested permissions
 * Sample Request body
 * {"clientId": "", "clientSecret": "", "permissions":""}
 */
router.post("/m2mauth", async (req, res, next) => {
  try{    
    const {clientId, clientSecret, permissions} = req.body;

    const auth = new AuthenticationClient({domain: process.env.ISSUER_BASE_URL.replace("https://", ""), clientId, clientSecret});
    const response = await auth.clientCredentialsGrant({audience:process.env.AUDIENCE, scope:permissions})

    res.send(response)
  } catch(e){
    res.send({error:e})    
  }
})

// END - M2M Routes

module.exports = router;

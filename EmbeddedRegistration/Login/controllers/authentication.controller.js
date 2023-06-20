const cookie = require("cookie");
const axios = require("axios");
const jwt_decode = require("jwt-decode");

/**
 * Render the home page 
 * @param {Request} req Restful request
 * @param {Response} res Restful response
 * @param {NextFunction} next execute next middleware
 */
const home = async (req, res, next) => {
  res.render("index", {
    title: "CIC Authentication Application",
  });
};

/**
 * Executes when the registration button is clicked
 * Generate a state and set it in a cookie
 * Redirects to the registration application, passing the required OAuth parameters
 * @param {Request} req Restful request
 * @param {Response} res Restful response
 * @param {NextFunction} next execute next middleware
 */
const register = async (req, res, next) => {
  // this should be randomly generated
  const state = "1233423";

  const registrationURL = `${process.env.REGISTER_URL}?response_type=code&state=${state}&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=openid%20profile%20email`;
  const cookieMaxAge = 1000 * 60 * 10;
  res.cookie("state", state, { maxAge: cookieMaxAge, httpOnly: true });

  res.redirect(registrationURL);
};

/**
 * Callback route used to complete registration + authentication.
 * Compares state param against cookie set during /registration.
 * Compares the sessionid param against cookie set during /registration
 * @param {Request} req Restful request
 * @param {Response} res Restful response
 * @param {NextFunction} next execute next middleware
 */
const registrationCallback = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const requestState = cookies["state"] ? cookies["state"] : null;
    const sessionId = cookies["sessionid"] ? cookies["sessionid"] : null;
    
    const state = req.query?.state;
    if (!requestState || !state || requestState !== state)
      throw new Error("Invalid state");

    const code = req.query?.code;
    if (!code) throw new Error("missing code");

    const authResult = await axios({
      url: `${process.env.ISSUER_BASE_URL}/oauth/token`,
      method: "POST",
      data: {
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
        code: req.query.code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    });
    const user = jwt_decode(authResult.data.id_token);

    //add error handling logic here if necessary
    if(sessionId !== user.sessionId)
        console.log(`Cookie session id (${sessionId}) does not match the id token (${user.sessionId})`)

    res.render("profile", {
      userProfile: JSON.stringify(user, null, 2),
      title: "Profile page",
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Render the profile page 
 * @param {Request} req Restful request
 * @param {Response} res Restful response
 * @param {NextFunction} next execute next middleware
 */
const profile = async (req, res, next) => {
  req.oidc.user.access_token = req.oidc.accessToken;
  res.render("profile", {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: "Profile page",
  });
};

module.exports = { home, register, registrationCallback, profile };

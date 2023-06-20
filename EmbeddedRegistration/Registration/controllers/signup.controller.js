/**
 * Extract the OAuth props from the query string
 * Generate a session id
 * Render the registration screen
 * @param {Request} req Restful request
 * @param {Response} res Restful response
 * @param {NextFunction} next execute next middleware
 */
const signup = async (req, res, next) => {
  const { response_type, state, client_id, redirect_uri, scope } = req.query;
  // this should be randomly generated
  const sessionid = "ABC123";

  try {
    const cookieMaxAge = 1000 * 60 * 10;
    res.cookie("sessionid", sessionid, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });
    res.render("signup", {
      domain: process.env.ISSUER,
      clientId: client_id,
      redirectUri: redirect_uri,
      responseType: response_type,
      state,
      scope,
      sessionid,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { signup };

exports.onExecutePostLogin = async (event, api) => {  
    api.idToken.setCustomClaim("sessionId", event.request.query?.sessionid)
  };
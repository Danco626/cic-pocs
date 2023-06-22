const axios = require("axios");
const jwt_decode = require("jwt-decode");
require("dotenv").config();

const getM2MToken = async () => {
  try {
    const requestBody = {
      clientId: process.env.M2M_CLIENT_ID,
      clientSecret: process.env.M2M_CLIENT_SECRET,
      permissions: process.env.PERMISSIONS,
    };

    const result = await axios({
      url: `${process.env.AUTH_API_URL}/m2mauth`,
      method: "POST",
      data: requestBody,
    });

    const { access_token } = result.data;
    const decodedToken = jwt_decode(access_token);
    console.log(decodedToken);
  } catch (e) {
    console.log("An error occurred")
    console.log(e)
  }
};

(async () => {
    await getM2MToken();
})();

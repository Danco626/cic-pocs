var router = require("express").Router();
const cookie = require("cookie");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const { requiresAuth } = require("express-openid-connect");

const { home, register, registrationCallback, profile} = require("../controllers/authentication.controller");

router.get("/", home);

router.get("/register", register);

router.get("/registrationCallback", registrationCallback);

router.get("/profile", requiresAuth(), profile);

module.exports = router;

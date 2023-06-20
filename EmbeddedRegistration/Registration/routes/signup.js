const router = require("express").Router();
const { signup } = require("../controllers/signup.controller");

/** registratioon page */
router.get("/", signup);



module.exports = router;

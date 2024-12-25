const authenticateToken = require("../../middleware/jwt");
const { registerUser, loginUser, getUser } = require("./handler");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateToken, getUser);

module.exports = router;
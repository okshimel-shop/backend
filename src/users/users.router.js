const { Router } = require("express");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");
const { getOneUser } = require("./users.controller");

const router = Router();

// router.get("/", authorize, tryCatchWrapper(getCurrent));
router.post("/login", tryCatchWrapper(getOneUser));

exports.usersRouter = router;
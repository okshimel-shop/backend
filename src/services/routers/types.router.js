const { Router } = require("express");
const { tryCatchWrapper } = require("../../helpers/try-catch-wrapper");
const { listAllTypes } = require("../controllers/types.controller");

const router = Router();

router.get("/all", tryCatchWrapper(listAllTypes));

exports.typesRouter = router;
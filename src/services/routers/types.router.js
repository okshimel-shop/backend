const { Router } = require("express");
const { tryCatchWrapper } = require("../../helpers/try-catch-wrapper");
const { createType, listAllTypes } = require("../controllers/types.controller");

const router = Router();

router.post("/", tryCatchWrapper(createType));
router.get("/all", tryCatchWrapper(listAllTypes));

exports.typesRouter = router;
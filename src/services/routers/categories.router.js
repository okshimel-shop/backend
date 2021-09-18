const { Router } = require("express");
const { tryCatchWrapper } = require("../../helpers/try-catch-wrapper");
const { listAllCategories } = require("../controllers/categories.controller");

const router = Router();

router.get("/all", tryCatchWrapper(listAllCategories));

exports.categoriesRouter = router;
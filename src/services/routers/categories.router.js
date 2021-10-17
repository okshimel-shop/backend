const { Router } = require("express");
const { tryCatchWrapper } = require("../../helpers/try-catch-wrapper");
const { createCategory, listAllCategories } = require("../controllers/categories.controller");

const router = Router();

router.post("/", tryCatchWrapper(createCategory));
router.get("/all", tryCatchWrapper(listAllCategories));

exports.categoriesRouter = router;
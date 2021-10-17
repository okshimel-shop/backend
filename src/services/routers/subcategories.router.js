const { Router } = require("express");
const { tryCatchWrapper } = require("../../helpers/try-catch-wrapper");
const { createSubcategory, listAllSubcategories } = require("../controllers/subcategories.controller");

const router = Router();

router.post("/", tryCatchWrapper(createSubcategory));
router.get("/all", tryCatchWrapper(listAllSubcategories));

exports.subcategoriesRouter = router;
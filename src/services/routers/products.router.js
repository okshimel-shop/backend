const { Router } = require("express");
const { upload } = require("../../helpers/imageWriter");
const { tryCatchWrapper } = require("../../helpers/try-catch-wrapper");
const { 
  createProduct, 
  getOneProduct, 
  listAllProducts, 
  listPopularProducts, 
  listDiscountProducts, 
  listNewProducts, 
  listProductsByIds, 
  deleteOneProduct 
} = require("../controllers/products.controller");

const router = Router();

router.post("/", upload.array('img', 6), tryCatchWrapper(createProduct));
router.get("/", tryCatchWrapper(listAllProducts));
router.get("/popular", tryCatchWrapper(listPopularProducts));
router.get("/discount", tryCatchWrapper(listDiscountProducts));
router.get("/new", tryCatchWrapper(listNewProducts));
router.get("/byids", tryCatchWrapper(listProductsByIds));
router.get("/:id", tryCatchWrapper(getOneProduct));
router.delete("/:id", tryCatchWrapper(deleteOneProduct));

exports.productsRouter = router;
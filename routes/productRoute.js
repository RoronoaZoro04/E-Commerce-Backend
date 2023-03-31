const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize, uploadImages } = require("../middlewares/uploadImages");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array('images',10),productImgResize,uploadImages);
router.get("/:id", getaProduct);
router.put("/wishlist",authMiddleware, addToWishList)
router.put("/rating",authMiddleware, rating)
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id, authMiddleware", isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;

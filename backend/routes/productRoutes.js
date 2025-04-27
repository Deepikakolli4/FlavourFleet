const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/addproduct/:firmId',productController.addProduct);
router.get('/getProductbyfirm/:firmId',productController.getProductByFirm);
module.exports = router;
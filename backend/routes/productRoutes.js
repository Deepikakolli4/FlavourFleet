const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/addproduct/:firmId',productController.addProduct);
router.get('/getProductbyfirm/:firmId',productController.getProductByFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
router.delete('/:productId',productController.deleteProductById);
module.exports = router;
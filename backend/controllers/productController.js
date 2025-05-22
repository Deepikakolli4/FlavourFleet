const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');//Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb){
        cb(null,Date.now()+path.extname(file.originalname));//Generating a unique filename
    }
});
const upload = multer({storage: storage})

const addProduct = async(req,res)=>{
   try{
       const {productName,price,category,bestSeller,description} = req.body;
       const image = req.file ? req.file.filename : undefined;
       //based on firm id we are adding the products 
       const firmId = req.params.firmId;
       console.log(firmId);
       const firm = await Firm.findById(firmId);
       if(!firm){
        return res.status(404).json({error:"No firm found"});
       }
       const product = new Product({
        productName,price,category,bestSeller,description,image,firm:firm._id
       })

       const savedProduct = await product.save();
       firm.product.push(savedProduct);
       await firm.save();
       return res.status(200).json({message:"Added Product Successfully"});
   }catch(error){
       console.error(error);
       res.status(500).json({error:"Internal Server Error"});
   }
}

const getProductByFirm = async(req,res)=>{
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"No firm found"});
        }
        const restaurantName = firm.firmName;
        const products = await Product.find({firm: firmId});
        res.status(200).json({ restaurantName,products});
    }catch(error){
        console.error(error);
        res.send(500).json({message:"Internal Server Error"});
    }
}
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'No Product Found' });
    }
    // Optionally remove product from firm's products array
    await Firm.updateOne(
      { product: productId },
      { $pull: { product: productId } }
    );
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};
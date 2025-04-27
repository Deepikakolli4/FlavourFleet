const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
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
        const products = await Product.find({firm: firmId});
        res.status(200).json({products});
    }catch(error){
        console.error(error);
        res.send(500).json({message:"Internal Server Error"});
    }
}

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm};
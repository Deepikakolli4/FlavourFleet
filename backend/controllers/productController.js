const product = require('../models/Product');
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
        
   }catch(error){

   }
}
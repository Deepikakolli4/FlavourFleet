const vendorController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();
router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin)
router.get('/allvendors',vendorController.getAllVendors);
router.get('/vendorById/:id',vendorController.getVendorById);//  to get the id dynamically 
module.exports = router;
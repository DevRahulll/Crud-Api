const express=require("express")
const router=express.Router();
const {getProducts,getProduct, createProduct, updatedProduct, deleteProduct}=require('../controllers/product.controller.js')

// displaying all products
router.get('/',getProducts)

// displaying single product
router.get('/:id',getProduct)

// adding new product
router.post('/',createProduct)

// updating a product
router.put('/:id',updatedProduct);

// deleting a product
router.delete('/:id',deleteProduct);


module.exports=router;
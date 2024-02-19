const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/product.model.js")

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb+srv://CRUD-API:987654321@cluster0.kje8rpe.mongodb.net/crudapi")
    .then(() => {
        console.log("Connected to database");
    }).catch(() => {
        console.log("DB connection Failed");
    })




app.get("/", (req, res) => {
    res.send("<h1>Hello Rahul</h1>");
})

app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            success: true,
            message: "user created successfully",
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

// Update a product

app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// Delete a Product
app.delete("/api/product/:id",async(req,res)=>{
    try {
        const{id}=req.params;

        const product=await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(402).json({
                message:"Product Not Found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully"
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Product Not Deleted"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
})
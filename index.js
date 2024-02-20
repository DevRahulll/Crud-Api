const express = require("express")
const mongoose = require("mongoose")
const router=require('./routes/product.route.js')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));


mongoose.connect("mongodb+srv://CRUD-API:987654321@cluster0.kje8rpe.mongodb.net/crudapi")
    .then(() => {
        console.log("Connected to database");
    }).catch(() => {
        console.log("DB connection Failed");
    })


// routes
app.use("/api/products",router)

app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
})
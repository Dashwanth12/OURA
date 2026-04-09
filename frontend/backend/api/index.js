require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Product = require('./config/models/product')

const app = express()
app.use(express.json())
app.use(cors())
const productRoutes = require('./routes/productRoutes')

app.use('/api/products', productRoutes);

// Mongoose

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch((err) => {
        console.log('MongoDB Connection Error:', err)
    })

// Route 

app.get('/', (req,res) => {
    res.send('Oura Backend is Running')
})

// Add Products 

app.post('/api/products/add', async (req,res) => {

    try{
        const newProduct = new Product(req.body)
        const saveProduct = await newProduct.save()
        res.status(201).json(saveProduct)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// update

app.put('/api/products/update/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { _id, __v, ...updateData } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Product Updated Successfully");
        res.json(updatedProduct);
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// get Products

app.get('/api/products/category/:catName', async (req,res) => {

    try{
        const cat = req.params.catName
        const products = await Product.find({category: cat})

        if (products.length === 0){
            return res.status(404).json({message: `No Products Found in ${cat}`})
        }

        res.json(products)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// delete Product

app.delete('/api/products/delete/:id', async (req,res) => {

    try{
        const {id} = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct){
            return res.status(404).json({message: 'Product not Found!'})
        }
        res.json({ message: 'Product removed from OURA inventory.'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// get all

app.get('/api/products/all', async (req, res) => {
    
    try{
        const {category, isFeatured} = req.query
        let filter = {}

        if (category){
            filter.category = {$regex: new RegExp(`^${category}$`, 'i')}
        }

        if (isFeatured){
            filter.isFeatured = isFeatured === 'true'
        }
        const products = await Product.find(filter)
        res.json(products)
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

// get product by id 

app.get('/api/products/:id', async (req,res) => {
    
    try{
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message: 'Product Not Found'})
            res.json(product)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


// Port 

const PORT = process.env.PORT || 5000

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
  })
}

module.exports = app

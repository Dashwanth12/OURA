const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const Product = require('../config/models/product');


router.get('/all', async (req, res) => {
    try {
        const { category, isFeatured } = req.query;
        let filter = {};

        if (category) {
            filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }
        if (isFeatured) {
            filter.isFeatured = isFeatured === 'true';
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Invalid ID format" });
    }
});


router.post('/add-product', upload.array('gallery', 5), async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path);
        const newProduct = new Product({
            ...req.body,
            imageUrl: imageUrls[0],
            gallery: imageUrls
        });
        await newProduct.save();
        res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        res.status(500).json({ message: "Upload failed" });
    }
});

module.exports = router;
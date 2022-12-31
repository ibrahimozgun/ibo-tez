const express = require('express');
const Category = require('../models/category');
const Clients = require('../models/Clients');
const Products = require('../models/products');
const Transaction = require('../models/transactions');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const products = await Products.find();
        res.json({ content: products, status: 200 })
    } catch (err) {
        res.json({ message: err, status: 500 }) 
    }
});

router.get('/by-name', async(req, res) => {
    try {
        const products = await Products.find({ name: req.body.name });
        if (products) {
            res.json(products)
        } else {
            res.json({ message: 'Products not found!', status: 404 })
        }
    } catch (err) {
        res.json({ message: err, status: 500 })
    }
});

router.post('/add', async(req, res) => {
    try {
        const allProducts = await Products.find();
        allProducts.forEach(u => {
            if (u.name == req.body.name) {
                res.json({ message: "Products already exist!", status: 400 });
                throw res;
            }
        });
        const products = new Products({
            name: req.body.name,
            categoryName: req.body.categoryName,
            price: req.body.price,
            stock: req.body.stock,
            tax: req.body.tax,
        });

        const saveProducts = await products.save();
        res.json({ content: saveProducts, status: 200 });
    } catch (err) {
        res.json({ message: 'Error had been occurred while adding product', status: 500 });
        throw err;
    }
});

router.post('/update', async(req, res) => {
    try {
        const updatedProducts = await Products.updateOne({ _id: req.body.id }, {
            $set: {
              name: req.body.name,
              categoryName: req.body.categoryName,
              price: req.body.price,
              tax: req.body.tax,
              stock: req.body.stock,
            }
        })
        res.json({ content: updatedProducts, status: 200 });
    } catch (err) {
        res.json({ message: err, status: 500 })
    }
});

router.post('/delete', async(req, res) => {
    try {
        const deletedProducts = await Products.deleteOne({ _id: req.body.id })
        res.json({ content: deletedProducts, status: 200 });
    } catch (err) {
        res.send({ message: err, status: 500 });
    }
});

router.post('/sell', async(req, res) => {
    try {
        console.log('aa');
        const products = await Products.find();
        const client = await Clients.findOne({ name: req.body.clientName });
        const reqProducts = req.body.productList;
        reqProducts.map(async product => {
            console.log('product: ', product);
            const updateProduct = await Products.updateOne({ _id: product._id }, {
                $set: {
                    stock: parseInt(product.stock) - parseInt(product.amount)
                }
            });
            console.log('updateProduct: ', updateProduct);
        })

        const updateClient = await Clients.updateOne({ _id: client._id }, {
            $set: {
                budget: parseInt(client.budget) + parseInt(req.body.totalPrice)
            }
        });

        const newTransaction = new Transaction({
            clientName: req.body.clientName,
            products: req.body.productList,
            totalPrice: req.body.totalPrice
        });
        console.log('newTransaction: ', newTransaction);
        const saveTransaction = await newTransaction.save();
        console.log('saveTransaction: ', saveTransaction);

        res.json({ content: true, status: 200 });
    } catch (error) {
        res.send({ message: error, status: 500 });
    }
});

module.exports = router;

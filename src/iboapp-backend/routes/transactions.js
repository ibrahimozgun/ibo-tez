const express = require('express')
const Transactions = require('../models/transactions');
const router = express.Router();

// GET ALL USERS
router.get('/', async(req, res) => {
  try {
      const transactions = await Transactions.find();
      res.json({ content: transactions, status: 200 })
  } catch (err) {
      res.json({ message: err, status: 500 }) 
  }
});


// ADD USER
router.post('/add', async(req, res) => {
  try {
      const allTransaction = await Transactions.find();

      const transaction = new Transactions({
        clientName: req.body.clientName,
        productName: req.body.productName,
        type: req.body.type,
        totalPrice: req.body.totalPrice,
      });

      const saveTransaction = await transaction.save();
      res.json({ content: saveTransaction, status: 200 });
  } catch (err) {
      res.json({ message: 'Error had been occurred while creating transaction', status: 500 });
      throw err;
  }
});

// UPDATE CLIENT
router.post('/update', async(req, res) => {
  try {
      const updatedTransaction = await Transactions.updateOne({ _id: req.body.id }, {
          $set: {
            clientName: req.body.clientName,
            productName: req.body.productName,
            type: req.body.type,
            totalPrice: req.body.totalPrice,
          }
      })
      res.json({ content: updatedTransaction, status: 200 });
  } catch (err) {
      res.send({ message: err, status: 500 })
  }
});


// DELETE CLIENT
router.post('/delete', async(req, res) => {
  try {
      const deletedTransaction = await Transactions.deleteOne({ _id: req.body.id })
      res.json({ content: deletedTransaction, status: 200 });
  } catch (err) {
      res.send({ message: err, status: 500 });
  }
});

module.exports = router;
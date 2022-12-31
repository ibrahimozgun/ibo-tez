const express = require('express')
const Clients = require('../models/Clients')
const router = express.Router();

// GET ALL USERS
router.get('/', async(req, res) => {
  try {
      const clients = await Clients.find();
      res.json({ content: clients, status: 200 })
  } catch (err) {
      res.json({ message: err, status: 500 }) 
  }
});


// ADD USER
router.post('/add', async(req, res) => {
  try {
      const allClients = await Clients.find();
      allClients.forEach(client => {
          if (client.taxNumber == req.body.taxNumber || client.name == req.body.name) {
              res.json({ message: "Tax number already in use!", status: 400 });
              throw res;
          }
      });
      const client = new Clients({
        name: req.body.name,
        taxNumber: req.body.taxNumber,
        city: req.body.city,
        administration: req.body.administration,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        budget: req.body.budget ?? 0
      });

      const saveClient = await client.save();
      res.json({ content: saveClient, status: 200 });
  } catch (err) {
      res.json({ message: 'Error had been occurred while creating client', status: 500 });
      throw err;
  }
});

// UPDATE CLIENT
router.post('/update', async(req, res) => {
  try {
      const updatedClient = await Clients.updateOne({ _id: req.body.id }, {
          $set: {
            name: req.body.name,
            taxNumber: req.body.taxNumber,
            city: req.body.city,
            administration: req.body.administration,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            budget: req.body.budget ?? 0
          }
      })
      res.json({ content: updatedClient, status: 200 });
  } catch (err) {
      res.send({ message: err, status: 500 })
  }
});


// DELETE CLIENT
router.post('/delete', async(req, res) => {
  try {
      const deletedClient = await Clients.deleteOne({ _id: req.body.id })
      res.json({ content: deletedClient, status: 200 });
  } catch (err) {
      res.send({ message: err, status: 500 });
  }
});

module.exports = router;
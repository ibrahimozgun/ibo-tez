const express = require('express')
const Users = require('../models/Users')
const router = express.Router();

// ADD USER
router.post('/add', async(req, res) => {
    try {
        const allUsers = await Users.find();
        allUsers.forEach(u => {
            if (u.email == req.body.email) {
                res.json({ message: "Email address already in use!", status: 400 });
                throw res;
            }
        });
        const user = new Users({
            fullName: req.body.fullName,
            email: req.body.email,
            status: req.body.status ?? 1,
            activity: req.body.activity ?? true,
            password: req.body.password
        });

        const saveUser = await user.save();
        res.json({ content: saveUser, status: 200 });
    } catch (err) {
        res.json({ message: 'Error had been occurred while signing up', status: 500 });
        throw err;
    }
});

// GET ALL USERS
router.get('/', async(req, res) => {
    try {
        const users = await Users.find();
        console.log(users);
        res.json({ content: users, status: 200 })
    } catch (err) {
        res.json({ message: err, status: 500 }) 
    }
});

// USER LOGIN
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await Users.find({ email: email, password: password });
        if (user.length === 1) {
            res.json({ content: user, status: 200 });
        } else {
            res.json({ message: 'User not found!', status: 404 })
        }
    } catch (err) {
        res.json({ message: 'User not found in db!', status: 500 })
    }
});

// GET A USER BY USERID
router.post('/getByUserID', async(req, res) => {
    try {
        const user = await Users.findById(req.body.userID)
        if (user) {
            res.json(user)
        } else {
            res.json({ message: 'User not found!', status: 1002 })
        }
    } catch (err) {
        res.json({ message: err, status: 1004 })
    }
});

// GET A USER BY EMAIL
router.post('/getByEmail', async(req, res) => {
    try {
        const user = await Users.find({ email: req.body.email });
        if (user) {
            res.json(user)
        } else {
            res.json({ message: 'User not found!', status: 1003 })
        }
    } catch (err) {
        res.json({ message: err, status: 1007 })
    }
});


// UPDATE USER
router.post('/update', async(req, res) => {
    try {
        const updatedPost = await Users.updateOne({ _id: req.body.userID }, {
            $set: {
                email: req.body.email,
                fullName: req.body.fullName
            }
        })
        res.send(updatedPost)
    } catch (err) {
        res.send({ message: err })
    }
});

// DELETE USER
router.post('/delete', async(req, res) => {
    try {
        const deletedPost = await Users.deleteOne({ _id: req.body.userID })
        res.send(deletedPost)
    } catch (err) {
        res.send({ message: err })
    }
});

module.exports = router;

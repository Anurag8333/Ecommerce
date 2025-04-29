const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');

const app = express();
app.use(express.json());

router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(201).json({newUser, message: 'User Registered Successfully.'});
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
            const user = await User.findOne({ email,password });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password.' });
        }

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: 'User Logged In Successfully.',
            createdAt: user.createdAt,
            updatedAt: user.updated
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
});

const adminSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
},{timestamps:true});
const Admin = mongoose.model("Admin",adminSchema);

router.post('/adminregister', async(req, res) => {
    const {username,email,password}= req.body;
    const admin = new Admin({
    username,
     email,
     password   
    })
    const newAdmin = await admin.save();
    res.status(201).send({newAdmin,message: 'Admin Registered Successfully.'});
});

router.post('/adminlogin', async(req, res) => {
    try {
        const {email,password}= req.body;
        const admin = await Admin.findOne({email,password});
        if(!admin){
            return res.status(401).json({ message: 'Invalid Email or Password.' });   
        }
        res.status(200).send({admin,message: 'Admin LoggedIn Successfully.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
});


module.exports = router;
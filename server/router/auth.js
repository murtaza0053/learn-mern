const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../models/userSchema');


router.get('/', (req, res) => {
    res.send('Hello world from the server router js!')
});

// using promise 
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword ) {
//         return res.status(422).json({error: ' please fill all fields.'});
//     }

//     User.findOne({
//         email: email
//     }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: 'Email already exist.'})
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(() => {
//             res.status(200).json({
//                 message: 'Registered Successfully'
//             })
//         }).catch((err) => res.status(500).json({error: 'Failed to registered.'}));

//     }).catch((err) => { console.log(err)});
// });

// using async
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({error: ' please fill all fields.'});
    }

    try{
         const userExist = await User.findOne({ email: email });

         if (userExist) {
            return res.status(422).json({ error: 'Email already exist.'});
         } else if (password !== cpassword) {
            return res.status(422).json({ error: 'Password should be same as cpassword.'});
         } else {
             const user = new User({ name, email, phone, work, password, cpassword });
             const userRegister = await user.save();
             res.status(201).json({ message: 'Registered Successfully' });
         }

    } catch (err) {
        console.log(err);
    }    
});


router.post('/signin', async (req, res) => {
    let token;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({error: ' please fill all fields.'});
        }
        const userLogin = await User.findOne({email: email});
        
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({error: 'Invalid credentials.'});
            } else {
                res.json({message: 'User sign in successfully.'});
            }
        } else {
            res.status(400).json({error: 'Invalid credentials.'});
        }

        
    } catch (err) {
        console.log(err);
    } 
})

module.exports = router;
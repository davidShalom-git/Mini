const express = require('express')
const Exam = require('../model/Exam')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { Name, Reg_No, Department, Year, DOB, Place, photoURL } = req.body;

    
    if (!Name || !Reg_No) {
        return res.status(400).json({ message: 'Name and Reg_No are required' });
    }

    const newUser = new Exam({
        Name,
        Reg_No,
        Department,
        Year,
        DOB,
        Place,
        photoURL, 
    });

    try {
        const data = await newUser.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});


module.exports = router
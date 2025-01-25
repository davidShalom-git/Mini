const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Exam = require('./routes/Exam');

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB Connected ra....");
}).catch((error) => {
    console.log(error);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('photo'), (req, res) => {
    try {
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to upload file',
            error: error.message
        });
    }
});


app.use('/api/reg', Exam);

const PORT = process.env.PORT || 2300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
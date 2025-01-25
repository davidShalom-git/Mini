const mongoose = require('mongoose')


const data = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Reg_No: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },

    Place: {
        type: String,
        required: true
    },
    photoURL: {
        type:String
    }

})

module.exports = mongoose.model('Exam',data);
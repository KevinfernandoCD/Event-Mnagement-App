const mongoose = require('mongoose');


const connectDB = async () => {

    try {

        const conn = await mongoose.connect('mongodb+srv://admin:admin123@cluster0.ebap7.mongodb.net/?retryWrites=true&w=majority')

        console.log('Connected To The Database')
        
    } catch (error) {

        console.log(error);
        process.exit();
        
    }


}

module.exports = connectDB
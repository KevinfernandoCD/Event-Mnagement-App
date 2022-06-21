const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingScchema = new Schema({

    event:{type:Schema.Types.ObjectId, ref:'Event'},

    bookeduser:{type:Schema.Types.ObjectId, ref:'User'}

},
{timestamps:true})


module.exports = mongoose.model('Booking',bookingScchema);


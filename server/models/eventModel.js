 const mongoose = require('mongoose');

 const Schema = mongoose.Schema;

 const eventSchema = new Schema({

    title:{type:String, require:true},
    type:{type:String,required:true},
    description:{type:String,require:true},
    price:{type:Number,required:true},
    date:{type:Date,required:true},
    creator:{type:Schema.Types.ObjectId,ref:"User"}
    
 });

 module.exports = mongoose.model('Event',eventSchema);





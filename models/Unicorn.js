const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// schema
const unicornSchema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    country: {
        type: String,
        default: "Sky"
    },
    likesJavaScript: Boolean
});

// model
const Unicorn = mongoose.model('Unicorn', unicornSchema);


module.exports = Unicorn;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    imp_words: {
        type: Array
    }
});

  

const Notes = mongoose.model("NOTES", userSchema);
module.exports = Notes; // Corrected from module.export to module.exports
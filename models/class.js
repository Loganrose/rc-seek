const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    id: String,
    max: Number,
    current: Number
});

module.exports = mongoose.model('Class', classSchema);

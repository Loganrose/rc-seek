const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

const childSchema = mongoose.Schema({
    name: String,
    grade: String,
    age: String,
})
const userSchema = mongoose.Schema({
    local            : {
        name        : String,
        password     : String,
    },
    children: [childSchema],
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

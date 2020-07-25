const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    passWord: String
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
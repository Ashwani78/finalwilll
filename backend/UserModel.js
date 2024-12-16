const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  wills: { type: Object },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

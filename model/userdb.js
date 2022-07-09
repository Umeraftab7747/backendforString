const mongoose = require("mongoose");

const UserSchemea = mongoose.Schema({
  firstName: String,
  LastName: String,
  Password: String,
  Email: {
    type: String,
    unique: true,
  },
});

exports.userDb = mongoose.model("User", UserSchemea);

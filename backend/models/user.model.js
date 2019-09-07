const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  participation:{
    type: Number,
    required: true,
  }
}, {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  firstName: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
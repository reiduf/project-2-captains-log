const Cruise = require("../models/cruise");

module.exports = {
  index
}

async function index(req, res) {
  const userCruises = await Cruise.find({ user: req.user._id });
  


  res.render('mypassport', { userCruises, title: "My Passport" })
  


}


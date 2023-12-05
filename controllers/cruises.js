const Cruise = require("../models/cruise");

module.exports = {
  index,
  new: newCruise
};

function newCruise(req, res) {
  res.render('cruises/new', { title: "Add New Cruise" });
}

async function index(req, res) {
  const cruises = await Cruise.find({ user: req.user._id });

  res.render('cruises/index', { 
    title: 'My Cruises',
    cruises 
  })
}
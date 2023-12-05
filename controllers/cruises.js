const Cruise = require("../models/cruise");

module.exports = {
  index,
  new: newCruise,
  create
};

function newCruise(req, res) {
  res.render('cruises/new', { title: "Add New Cruise" });
}

async function index(req, res) {
  const userCruises = await Cruise.find({ user: req.user._id });

  res.render('cruises/index', { 
    title: 'My Cruises',
    userCruises 
  })
}

async function create(req, res) {
    
  req.body.user = req.user._id;
 
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  try {
    await Cruise.create(req.body)
    res.redirect('/cruises');
  } catch(err) {
    console.log(err)
    res.render('cruises/new', { errorMsg: err.message })
  }
}
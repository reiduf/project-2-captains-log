const Cruise = require("../models/cruise");

module.exports = {
  index,
  new: newCruise,
  create,
  show,
  delete: deleteCruise,
  update,
  edit
};

function newCruise(req, res) {
  res.render('cruises/new', { title: "Add New Cruise" });
}

async function index(req, res) {
  const userCruises = await Cruise.find({ user: req.user._id }).sort({ startDate: -1});
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

async function show(req, res) {
  const cruise = await Cruise.findById(req.params.id)
  res.render('cruises/show', { cruise, title: 'Cruise Details' })
}

async function deleteCruise(req, res) {
  await Cruise.deleteOne({ _id: req.params.id });
  res.redirect('/cruises');
}

async function update(req, res) {
  const cruise = await Cruise.findById(req.params.id);
  const reqBody = req.body;

  for (let key in cruise) {
    if (reqBody[key]) {
      cruise[key] = reqBody[key];
    }
  }

  await cruise.save();
  res.redirect(`/cruises/${cruise._id}`)
}

async function edit(req, res) {
  const cruise = await Cruise.findById(req.params.id)
  res.render('cruises/edit', { cruise, title: 'Edit Cruise' })
}
const Cruise = require("../models/cruise");

module.exports = {
  new: newLog,
  create,
  show
};

async function newLog(req,res) {
  const cruise = await Cruise.findById(req.params.id)
  res.render('logs/new', { cruise, title: 'Create New Log' })
}

async function create(req, res) {
  const cruise = await Cruise.findById(req.params.id);

  cruise.logs.push(req.body);
  try {
    await cruise.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/cruises/${cruise._id}`);
}

async function show(req, res) {
  const cruise = await Cruise.findById(req.params.cruiseId);

  res.render('logs/show', { cruise, title: 'Log Details'})
}
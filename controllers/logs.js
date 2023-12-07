const Cruise = require("../models/cruise");

module.exports = {
  new: newLog
};

async function newLog(req,res) {
  const cruise = await Cruise.findById(req.params.id)
  res.render('logs/new', { cruise, title: 'Create New Log' })
}
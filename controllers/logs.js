const Cruise = require("../models/cruise");

module.exports = {
  new: newLog,
  create,
  show,
  edit,
  update,
  delete: deleteLog
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
  //find the log with the id of the req params
  const cruise = await Cruise.findById(req.params.cruiseId);
  const log = cruise.logs.find(log => log._id.toString() === req.params.logId)

  res.render('logs/show', { log, cruise, title: 'Log Details' })
}

async function edit(req, res) {
  const cruise = await Cruise.findById(req.params.cruiseId);
  const log = cruise.logs.find(log => log._id.toString() === req.params.logId)

  res.render('logs/edit', { log, cruise, title: 'Edit log'});
}

async function update(req,res) {
  const cruise = await Cruise.findById(req.params.cruiseId);
  const log = cruise.logs.find(log => log._id.toString() === req.params.logId)

  for (let key in log) {
    if (req.body[key]) {
      log[key] = req.body[key];
    }
  }

  try {
    await cruise.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/cruises/${cruise._id}/logs/${log._id}`);
}

async function deleteLog(req, res) {
  const cruise = await Cruise.findById(req.params.cruiseId);
  cruise.logs.remove(req.params.logId)

  await cruise.save();
  res.redirect(`/cruises/${cruise._id}`)
}
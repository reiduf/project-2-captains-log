const Cruise = require("../models/cruise");

module.exports = {
  index
}

async function index(req, res) {
  const userCruises = await Cruise.find({ user: req.user._id });
  let memberStatus = await getMemberStatus(req)


  res.render('mypassport', { userCruises, memberStatus, title: "My Passport" })
  


}

async function getMemberStatus(req,res) {
  const userCruises = await Cruise.find({ user: req.user._id });
  let memberStatus;
  
  if (userCruises.length >= 11) {
    memberStatus = 'Sea Maestro (11+ cruises)'
  } else if (userCruises.length >= 7 && userCruises.length <= 10) {
    memberStatus = 'Cruise Connoisseur (7-10 cruises taken)'
  } else if (userCruises.length >= 4 && userCruises.length <= 6) {
    memberStatus = 'Nautical Explorer (4-6 cruises taken)'
  } else if (userCruises.length < 3) {
    memberStatus = 'Cruise Apprentice (0-3 cruises taken)'
  }

  return memberStatus;
}


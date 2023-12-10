const Cruise = require("../models/cruise");

module.exports = {
  index
}

async function index(req, res) {
  const userCruises = await Cruise.find({ user: req.user._id });
  let memberStatus = await getMemberStatus(req);
  const cruiseTallyString = buildCruiseTallyString(userCruises);
  const cruiseBoatTally = buildCruiseBoatTally(userCruises);

  res.render('mypassport', { 
    userCruises, 
    memberStatus, 
    cruiseTallyString, 
    cruiseBoatTally, 
    title: "My Passport" })
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

function buildCruiseTallyString(userCruises) {
  const cruiseTallyTotals = userCruises.reduce((acc, cruise) => {
      acc[cruise.cruiseLine] = acc[cruise.cruiseLine] ? acc[cruise.cruiseLine] + 1 : 1;
      return acc;
    }, {})

  const tallyArray = [];
  
  for (const property in cruiseTallyTotals) {
    tallyArray.push(`${property} (x${cruiseTallyTotals[property]})`);
  }
  
  const tallyArraySorted = tallyArray.sort();
  const tallyString = tallyArraySorted.join(', ');
  return tallyString;
}

function buildCruiseBoatTally(userCruises) {
  const cruiseTallyTotals = userCruises.reduce((acc, cruise) => {
      acc[cruise.cruiseBoat] = acc[cruise.cruiseBoat] ? acc[cruise.cruiseBoat] + 1 : 1;
      return acc;
    }, {})

  const tallyArray = [];

  for (const property in cruiseTallyTotals) {
    tallyArray.push(`${property} (x${cruiseTallyTotals[property]})`);
  }

  const tallyArraySorted = tallyArray.sort();
  return tallyArraySorted;
}
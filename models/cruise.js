const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  date: Date,
  dayRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  favActivity: String,
  comment: String,
  seaConditions: String,
  weather: String
}, {
  timestamps: true
});

const cruiseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  numDays: {
    type: Number,
    min: 1,
    required: true
  },
  cruiseLine: {
    type: String,
    default: 'Disney',
    enum: ['Disney', 'Princess', 'Royal Caribbean', 'Carnival', 'Celebrity'],
  },
  cruiseBoat: String,
  startDate: Date,
  endDate: Date,
  itinerary: String,
  logs: {
    type: [logSchema],
    default: []
  },
  notes: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Cruise', cruiseSchema);
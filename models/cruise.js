const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  entryDate: Date,
  dayRating: {
    type: String,
    enum: [
      "😭 - Awful",
      "🙁 - Not the best",
      "🙂 - Good",   
      "😃 - Great!",
      "😁 - Fantastic!"
    ]
  },
  favActivity: String,
  comment: String,
  seaConditions: {
    type: String,
    enum: [
      "Smooth sailing!",
      "A little movement, can't complain",
      "Pretty standard day on the ocean",
      "Choppy, I need to put on my sea legs",
      "Insane, get me off this ship!"
    ]
  },
  weather: {
    type: String,
    enum: [
      "☀️ - Sunny",
      "🌬️ - Windy",
      "🌥️ - Cloudy",
      "🌧️ - Rainy",
      "⛈️ - Stormy",
      "🌪️ - Hurricane"
    ]
  },
  currentLoc: String
}, {
  timestamps: true
});

const cruiseSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 30
  },
  numDays: {
    type: Number,
    min: 1,
    max: 21,
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
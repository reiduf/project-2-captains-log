const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  entryDate: {
    type: Date,
    required: true
  },
  dayRating: {
    type: String,
    enum: [
      "😭 - Awful",
      "🙁 - Not the best",
      "🙂 - Good",   
      "😃 - Great!",
      "😁 - Fantastic!"
    ],
    required: true
  },
  favActivity: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  seaConditions: {
    type: String,
    enum: [
      "Smooth sailing!",
      "A little movement, can't complain",
      "Pretty standard day on the ocean",
      "Choppy, I need to put on my sea legs",
      "Insane, get me off this ship!"
    ],
    required: true
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
    ],
    required: true
  },
  currentLoc: {
    type: String,
    required: true
  }
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
    required: true,
  },
  cruiseBoat: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  itinerary: {
    type: String,
    required: true
  },
  logs: {
    type: [logSchema],
    default: [],
    required: true,
  },
  notes: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Cruise', cruiseSchema);
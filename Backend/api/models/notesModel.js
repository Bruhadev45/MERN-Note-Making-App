const mongoose = require("mongoose");

// Define the notes schema with timestamps enabled
const notesSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
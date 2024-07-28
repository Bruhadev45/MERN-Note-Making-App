const Notes = require("../models/notesModel");
const User = require("../models/userModel");

async function createNote(req, res) {
  const { text } = req.body;
  
  try {
    if (!req.userId)
      res
        .status(403)
        .json({ success: 403, message: `You are not authorized  ${error}` });
    
    const user = await User.findById(req.userId);
    if (!user)
      res
        .status(404)
        .json({ success: 403, message: `User not found ${error}` });

    const newNote = new Notes({
      text,
      userId: user._id,
    });

    await newNote
      .save()
      .then(() => {
        res.status(201).json({ success: 200, data: newNote });
      })
      .catch((err) => {
        throw(err);
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: 500, message: `Error creating note ${error}` });
  }
}

async function getNote(req, res) {
  try {
    const note = await Notes.findOne(req.params.id);
    if (!note) {
      res.status(500).json({ message: "Note not present" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: `Error fetching notes ${err}` });
  }
}

async function getAllNotes(req, res) {
  try {
    const note = await Notes.find(req.params.id);
    if (!note) {
      res.status(500).json({ message: "Note not present" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: `Error fetching notes ${err}` });
  }
}

async function updateNote(req, res) {}

async function deleteNote(req, res) {
  
}

module.exports = {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
};

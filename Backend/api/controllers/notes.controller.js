const Notes = require("../models/notesModel");
const User = require("../models/userModel");

async function createNote(req, res) {
  const { text } = req.body;
  
  try {
    if (!req.userId) res.status(403).json({ success: 403, message: `You are not authorized  ${error}` });

    const user = await User.findById(req.userId);
    if (!user) res.status(404).json({ success: 403, message: `User not found ${error}` });

    const newNote = new Notes({
      text,
      userId: user._id,
    });

    await newNote.save()
      .then(() => {
        res.status(201).json({ success: 200, data: newNote });
      })
      .catch((err) => {
        throw(err);
      });
  } catch (error) {
    res.status(500).json({ success: 500, message: `Error creating note ${error}` });
  }
}

async function getNote(req, res) {
  try {
    if (!req.userId) res.status(403).json({ success: 403, message: `You are not authorized  ${error}` });

    const user = await User.findById(req.userId);
    if (!user) res.status(404).json({ success: 403, message: `User not found ${error}` });

    const note = await Notes.findOne({ _id: req.body.id, userId: user._id });
    if (!note) {
      res.status(500).json({ message: "Note not present" });
    }

    res.status(201).json({ success: 200, data: {
      text: note.text,
      id: note._id,
    } });
  } catch (err) {
    res.status(500).json({ message: `Error fetching notes ${err}` });
  }
}

async function getAllNotes(req, res) {
  try {
    if (!req.userId) res.status(403).json({ success: 403, message: `You are not authorized  ${error}` });

    const user = await User.findById(req.userId);
    if (!user) res.status(404).json({ success: 403, message: `User not found ${error}` });
    
    const notes = await Notes.find({ userId: user._id }).sort({ createdAt: -1 });
    if (!notes) {
      res.status(500).json({ message: "Note not found" });
    }

    res.status(201).json({ success: 200, data: notes });

  } catch (err) {
    res.status(500).json({ message: `Error fetching notes ${err}` });
  }
}

async function updateNote(req, res) {
  try {
    if (!req.userId) res.status(403).json({ success: 403, message: `You are not authorized  ${error}` });

    const user = await User.findById(req.userId);
    if (!user) res.status(404).json({ success: 403, message: `User not found ${error}` });

    const updatedNote = await Notes.findByIdAndUpdate(req.body.id, { text: req.body.text }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ success: 403, message: "Note not found" });
    }
    
    res.status(201).json({ success: 200, data: updatedNote });
  } catch (err) {
    res.status(500).json({ message: `Error fetching notes ${err}` });
  }
}

async function deleteNote(req, res) {
  try {
    if (!req.userId) res.status(403).json({ success: 403, message: `You are not authorized  ${error}` });

    const user = await User.findById(req.userId);
    if (!user) res.status(404).json({ success: 403, message: `User not found ${error}` });

    const note = await Notes.findById(req.body.id);

    if (!note) {
      res.status(500).json({ message: "Note is not present" });
    }

    const isDeleted = await Notes.findByIdAndDelete(note._id);

    if (!isDeleted) {
      res.status(500).json({ message: "Failed to delete note" });
    }

    res.status(201).json({ success: 200, message: "Note deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: `Error fetching notes ${err}` });
  }
}

module.exports = {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
};
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Vikramdb:Vikram1636@cluster0.unuid.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("Hello")
// Define Note model
const Note = mongoose.model("Note", {
  title: String,
  content: String,
});

// Routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.json(note);
});
app.put("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(updatedNote);
  });
  
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

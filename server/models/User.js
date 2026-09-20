const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  lang: { type: String, required: true },
  content: { type: String, default: '' }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  experienceLevel: { type: String, default: 'Beginner' },
  profilePic: { type: String, default: 'fa-user-astronaut' },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 1 },
  lastActive: { type: Date, default: Date.now },
  badges: [{ type: String }],
  completedModules: [{ type: String }],
  studyMinutes: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0] },
  notes: [NoteSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  text: { type: String, required: true },
  image: { type: String, default: null },
  likes: { type: Number, default: 0 },
  comments: [{
    author: { type: String, required: true },
    avatar: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);

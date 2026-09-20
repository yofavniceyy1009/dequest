require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./server/models/User');
const Post = require('./server/models/Post');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devquest';
const JWT_SECRET = process.env.JWT_SECRET || 'devquest-secret-key-1357';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static frontend files (index.html, style.css, app.js, data.js)
app.use(express.static(path.join(__dirname)));

// Health Check for client frontend detection
app.get('/api/health', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: 'ok', message: 'DevQuest API Server is active and DB connected.' });
  } else {
    res.status(503).json({ status: 'error', message: 'Database disconnected.' });
  }
});

// Register Endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName, experienceLevel, profilePic } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName: firstName || '',
      lastName: lastName || '',
      experienceLevel: experienceLevel || 'Beginner',
      profilePic: profilePic || 'fa-user-astronaut',
      isVerified: username === 'Alicia',
      role: username === 'Alicia' ? 'admin' : 'user',
      level: 1,
      xp: 0,
      streak: 1,
      lastActive: new Date(),
      badges: [],
      completedModules: [],
      studyMinutes: [0, 0, 0, 0, 0, 0, 0],
      notes: [
        {
          id: 'note_welcome',
          title: 'Welcome to DevQuest Notes',
          lang: 'general',
          content: 'Use this workspace to compile key takeaways, code samples, and definitions as you learn!\n\nSimply click "+ Create Note" or write notes here, then export them directly as a PDF or Google Doc.'
        }
      ]
    });

    await newUser.save();
    
    // Sign Token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      success: true,
      token,
      user: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        experienceLevel: newUser.experienceLevel,
        profilePic: newUser.profilePic,
        isVerified: newUser.isVerified,
        role: newUser.role,
        level: newUser.level,
        xp: newUser.xp,
        streak: newUser.streak,
        lastActive: newUser.lastActive,
        badges: newUser.badges,
        completedModules: newUser.completedModules,
        studyMinutes: newUser.studyMinutes
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Register error', error: error.message });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        experienceLevel: user.experienceLevel,
        profilePic: user.profilePic,
        isVerified: user.isVerified,
        role: user.role,
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        lastActive: user.lastActive,
        badges: user.badges,
        completedModules: user.completedModules,
        studyMinutes: user.studyMinutes
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ message: 'No authorization header' });
    
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });
    
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Authentication required' });
  }
};

// Sync User Stats Endpoint
app.post('/api/user/sync', auth, async (req, res) => {
  try {
    const updates = req.body;
    
    // Only update specific game fields
    const allowedUpdates = [
    'level', 'xp', 'streak', 'lastActive', 'badges', 'completedModules',
    'studyMinutes', 'notes', 'firstName', 'lastName', 'experienceLevel', 'profilePic',
    'isVerified', 'role', 'chatHistory', 'aiName'
  ];
    allowedUpdates.forEach(key => {
      if (updates[key] !== undefined) {
        req.user[key] = updates[key];
      }
    });

    await req.user.save();
    
    res.json({
      success: true,
      user: {
        username: req.user.username,
        level: req.user.level,
        xp: req.user.xp,
        streak: req.user.streak,
        lastActive: req.user.lastActive,
        badges: req.user.badges,
        completedModules: req.user.completedModules,
        studyMinutes: req.user.studyMinutes
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Sync error', error: error.message });
  }
});

// Get Notes
app.get('/api/notes', auth, async (req, res) => {
  res.json({ notes: req.user.notes || [] });
});

// Create/Update Note
app.post('/api/notes', auth, async (req, res) => {
  try {
    const note = req.body;
    if (!note.id || !note.title || !note.lang) {
      return res.status(400).json({ message: 'Missing note parameters' });
    }

    const noteIndex = req.user.notes.findIndex(n => n.id === note.id);
    if (noteIndex !== -1) {
      req.user.notes[noteIndex] = note;
    } else {
      req.user.notes.push(note);
    }

    await req.user.save();
    res.json({ success: true, notes: req.user.notes });
  } catch (error) {
    res.status(500).json({ message: 'Save note error', error: error.message });
  }
});

// Get Community Posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// Create Community Post
app.post('/api/posts', auth, async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Post text is required' });
    }

    const newPost = new Post({
      author: req.user.username,
      avatar: req.user.profilePic || 'fa-user',
      isVerified: req.user.isVerified || false,
      text,
      image: image || null,
      userId: req.user._id
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// Like a Post
app.post('/api/posts/:id/like', auth, async (req, res) => {
  try {
    if (['mock_1', 'mock_2', 'mock_3'].includes(req.params.id)) {
      return res.json({ success: true, likes: 99 });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Simplistic like counter (doesn't track exactly who liked it to allow toggling, just increments for demo)
    post.likes += 1;
    await post.save();
    
    res.json({ success: true, likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
});

// Add a Comment to a Post
app.post('/api/posts/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    if (['mock_1', 'mock_2', 'mock_3'].includes(req.params.id)) {
      return res.json({ success: true, message: 'Mock post commented successfully' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const newComment = {
      author: req.user.username,
      avatar: req.user.profilePic || 'fa-user',
      isVerified: req.user.isVerified || false,
      text: text,
      createdAt: new Date()
    };
    
    post.comments.push(newComment);
    await post.save();
    
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

// AI Mentor Chat Proxy
app.post('/api/mentor/chat', async (req, res) => {
  try {
    const { message, aiName } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      return res.status(500).json({ error: "Server missing Gemini API Key in .env file" });
    }
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are an AI coding mentor on a learning platform. Your name is "${aiName || 'DevQuest AI Mentor'}". Your tone is fun and Spider-Verse themed (cool, comic-book, glitchy tech). Keep answers concise and helpful. Format in plain text or simple markdown. User says: ${message}` }] }]
      })
    });
    
    const data = await response.json();
    
    if (data.error) throw new Error(data.error.message);
    
    const textResponse = data.candidates[0].content.parts[0].text;
    res.json({ success: true, text: textResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Connect to MongoDB & Start Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB database: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`DevQuest backend running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB database connection error:', err.message);
    console.log('API Server running in local standalone dev mode.');
    app.listen(PORT, () => {
      console.log(`DevQuest backend running on port ${PORT} (Database disconnected)`);
    });
  });

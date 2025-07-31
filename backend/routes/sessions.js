const express = require('express');
const Session = require('../models/session.js');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' })
      .sort({ created_at: -1 })
      .populate('user_id', 'email');

    const formatted = sessions.map(s => ({
      _id: s._id,
      title: s.title,
      tags: s.tags,
      json_file_url: s.json_file_url,
      uploaderEmail: s.user_id ? s.user_id.email : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.use(authMiddleware);

router.get('/my-sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id }).sort({ updated_at: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my-sessions/:id', async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/my-sessions/save-draft', async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    if (id) {
      const session = await Session.findOne({ _id: id, user_id: req.user.id });
      if (!session) return res.status(404).json({ message: 'Session not found' });
      if (session.status === 'published') return res.status(400).json({ message: 'Cannot update published session as draft' });

      session.title = title;
      session.tags = tags || [];
      session.json_file_url = json_file_url || '';
      session.updated_at = new Date();
      await session.save();
      return res.json(session);
    } else {
      const newSession = new Session({
        user_id: req.user.id,
        title,
        tags: tags || [],
        json_file_url: json_file_url || '',
        status: 'draft',
        created_at: new Date(),
        updated_at: new Date()
      });
      await newSession.save();
      return res.json(newSession);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/my-sessions/publish', async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'Session ID required' });

  try {
    const session = await Session.findOne({ _id: id, user_id: req.user.id });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.status = 'published';
    session.updated_at = new Date();
    await session.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

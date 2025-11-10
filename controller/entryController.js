import Entry from '../models/entry.model.js';

const getUserId = (req) => req.user?.id ?? req.user?._id ?? req.user?.userId;

const toArray = (value) => {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return undefined;
};

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
};

export const createEntry = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { date, completed, struggles, nextSteps, mood, tags, isPublic } = req.body;

  try {
    const entry = await Entry.create({
      user: userId,
      date,
      completed,
      struggles,
      nextSteps,
      mood,
      tags,
      isPublic,
    });
    res.status(201).json({ message: 'Entry created successfully', entry });
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ message: 'Error creating entry' });
  }
};

export const getEntries = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const entries = await Entry.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Entries retrieved successfully', entries });
  } catch (error) {
    console.error('Error retrieving entries:', error);
    res.status(500).json({ message: 'Error retrieving entries' });
  }
};

export const getEntryById = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.params;

  try {
    const entry = await Entry.findOne({ _id: id, user: userId });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry retrieved successfully', entry });
  } catch (error) {
    console.error('Error retrieving entry:', error);
    res.status(500).json({ message: 'Error retrieving entry' });
  }
};

export const updateEntry = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.params;
  const { date, completed, struggles, nextSteps, mood, tags, isPublic } = req.body;

  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: id, user: userId },
      { date, completed, struggles, nextSteps, mood, tags, isPublic },
      { new: true, runValidators: true }
    );
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry updated successfully', entry });
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ message: 'Error updating entry' });
  }
};

export const deleteEntry = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.params;

  try {
    const entry = await Entry.findOneAndDelete({ _id: id, user: userId });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully', entry });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Error deleting entry' });
  }
};

export const getEntryByUser = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const entries = await Entry.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Entries retrieved successfully', entries });
  } catch (error) {
    console.error('Error retrieving entries:', error);
    res.status(500).json({ message: 'Error retrieving entries' });
  }
};

export const getEntriesByFilter = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { date, mood } = req.query;
  const completed = toArray(req.query.completed);
  const struggles = toArray(req.query.struggles);
  const nextSteps = toArray(req.query.nextSteps);
  const tags = toArray(req.query.tags);
  const isPublic = parseBoolean(req.query.isPublic);

  const filter = { user: userId };
  if (date) {
    filter.date = new Date(date);
  }
  if (mood) {
    filter.mood = mood;
  }
  if (tags?.length) {
    filter.tags = { $in: tags };
  }
  if (completed?.length) {
    filter.completed = { $in: completed };
  }
  if (struggles?.length) {
    filter.struggles = { $in: struggles };
  }
  if (nextSteps?.length) {
    filter.nextSteps = { $in: nextSteps };
  }
  if (typeof isPublic === 'boolean') {
    filter.isPublic = isPublic;
  }

  try {
    const entries = await Entry.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Entries retrieved successfully', entries });
  } catch (error) {
    console.error('Error retrieving entries with filters:', error);
    res.status(500).json({ message: 'Error retrieving entries' });
  }
};
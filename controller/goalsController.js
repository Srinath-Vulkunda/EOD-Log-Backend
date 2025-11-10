import Goal from '../models/goals.model.js';
import bcrypt from 'bcryptjs';

export const createGoal = async (req, res) => {
  try {
    const { title, description, category, priority, status, startDate, dueDate, progress } = req.body;

    if (!title || !description || !category || !priority || !status || !startDate || !dueDate || progress === undefined) {
      return res.status(400).json({ message: 'Please fill in all the required fields' });
    }

    const newGoal = new Goal({
      user: req.user.id, // Get user ID from JWT token
      title,
      description,
      category,
      priority,
      status,
      startDate,
      dueDate,
      progress,
    });

    await newGoal.save();

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goals' });
  }
};

export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goal' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { title, description, category, priority, status, startDate, dueDate, progress } = req.body;

    if (!title || !description || !category || !priority || !status || !startDate || !dueDate || progress === undefined) {
      return res.status(400).json({ message: 'Please fill in all the required fields' });
    }

    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        priority,
        status,
        startDate,
        dueDate,
        progress,
      },
      { new: true } // Return the updated document
    );

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
};

export const getGoalByUser = async (req, res) => {
  try {
    const user = await Goal.find({ user: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goal by user' });
  }
};

export const getGoalByUserAndDate = async (req, res) => {
  try {
    const user = await Goal.findOne({
      user: req.params.id,
      startDate: req.params.date,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goal by user and date' });
  }
};
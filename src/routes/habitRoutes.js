const express = require('express');
const router = express.Router();
const { HabitStore, ValidationError } = require('../data/store');

// Initialize store
const habitStore = new HabitStore();

// GET /api/habits - Get all habits
router.get('/', (req, res) => {
  try {
    const { active, date } = req.query;
    
    let habits;
    if (date) {
      habits = habitStore.findByDate(date);
    } else if (active === 'true') {
      habits = habitStore.findActive();
    } else {
      habits = habitStore.findAll();
    }
    
    res.json({
      success: true,
      count: habits.length,
      data: habits
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/habits/:id - Get habit by ID
router.get('/:id', (req, res) => {
  try {
    const habit = habitStore.findById(req.params.id);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    res.json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/habits - Create a new habit
router.post('/', (req, res) => {
  try {
    const habit = habitStore.create(req.body);
    
    res.status(201).json({
      success: true,
      data: habit
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/habits/:id - Update a habit
router.put('/:id', (req, res) => {
  try {
    const habit = habitStore.update(req.params.id, req.body);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    res.json({
      success: true,
      data: habit
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', (req, res) => {
  try {
    const deleted = habitStore.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Habit deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/habits/:id/complete - Mark habit as complete
router.patch('/:id/complete', (req, res) => {
  try {
    const { date } = req.body;
    const habit = habitStore.markComplete(req.params.id, date);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    res.json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/habits/:id/incomplete - Mark habit as incomplete
router.patch('/:id/incomplete', (req, res) => {
  try {
    const { date } = req.body;
    const habit = habitStore.markIncomplete(req.params.id, date);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    res.json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
module.exports.habitStore = habitStore; // Export for testing

const Habit = require('../models/Habit');

// In-memory data store
class HabitStore {
  constructor() {
    this.habits = new Map();
  }

  // Create a new habit
  create(data) {
    const errors = Habit.validate(data);
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    const habit = new Habit(data);
    this.habits.set(habit.id, habit);
    return habit;
  }

  // Get all habits
  findAll() {
    return Array.from(this.habits.values());
  }

  // Get active habits only
  findActive() {
    return Array.from(this.habits.values()).filter(h => h.isActive);
  }

  // Get habit by ID
  findById(id) {
    return this.habits.get(id) || null;
  }

  // Update habit
  update(id, data) {
    const habit = this.habits.get(id);
    if (!habit) {
      return null;
    }

    const updatedData = { ...habit.toJSON(), ...data };
    const errors = Habit.validate(updatedData);
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    const updatedHabit = new Habit({
      ...updatedData,
      id,
      updatedAt: new Date().toISOString()
    });
    
    this.habits.set(id, updatedHabit);
    return updatedHabit;
  }

  // Delete habit
  delete(id) {
    if (!this.habits.has(id)) {
      return false;
    }
    this.habits.delete(id);
    return true;
  }

  // Mark habit as complete for a specific date
  markComplete(id, date) {
    const habit = this.habits.get(id);
    if (!habit) {
      return null;
    }
    habit.markComplete(date);
    this.habits.set(id, habit);
    return habit;
  }

  // Mark habit as incomplete for a specific date
  markIncomplete(id, date) {
    const habit = this.habits.get(id);
    if (!habit) {
      return null;
    }
    habit.markIncomplete(date);
    this.habits.set(id, habit);
    return habit;
  }

  // Get habits completed on a specific date
  findByDate(date) {
    const dateStr = date || new Date().toISOString().split('T')[0];
    return Array.from(this.habits.values()).filter(h => h.isCompletedOn(dateStr));
  }

  // Clear all habits (for testing)
  clear() {
    this.habits.clear();
  }

  // Seed initial data (for testing)
  seed() {
    this.clear();
    this.create({ name: 'Morning Exercise', description: '30 minutes of workout', frequency: 'daily' });
    this.create({ name: 'Read a Book', description: 'Read for at least 20 minutes', frequency: 'daily' });
    this.create({ name: 'Meditate', description: '10 minutes of meditation', frequency: 'daily' });
  }
}

// Custom error class for validation errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports = { HabitStore, ValidationError };

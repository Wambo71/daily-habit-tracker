const { v4: uuidv4 } = require('uuid');

class Habit {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.description = data.description || '';
    this.frequency = data.frequency || 'daily'; // daily, weekly, custom
    this.completedDates = data.completedDates || [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  markComplete(date) {
    const dateStr = date || new Date().toISOString().split('T')[0];
    if (!this.completedDates.includes(dateStr)) {
      this.completedDates.push(dateStr);
      this.updatedAt = new Date().toISOString();
    }
    return this;
  }

  markIncomplete(date) {
    const dateStr = date || new Date().toISOString().split('T')[0];
    this.completedDates = this.completedDates.filter(d => d !== dateStr);
    this.updatedAt = new Date().toISOString();
    return this;
  }

  isCompletedOn(date) {
    const dateStr = date || new Date().toISOString().split('T')[0];
    return this.completedDates.includes(dateStr);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      frequency: this.frequency,
      completedDates: this.completedDates,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isActive: this.isActive
    };
  }

  static validate(data) {
    const errors = [];
    
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Name is required and must be a string');
    }
    
    if (data.name && data.name.length < 1) {
      errors.push('Name must not be empty');
    }
    
    if (data.name && data.name.length > 100) {
      errors.push('Name must not exceed 100 characters');
    }
    
    if (data.frequency && !['daily', 'weekly', 'custom'].includes(data.frequency)) {
      errors.push('Frequency must be one of: daily, weekly, custom');
    }
    
    if (data.description && data.description.length > 500) {
      errors.push('Description must not exceed 500 characters');
    }
    
    return errors;
  }
}

module.exports = Habit;

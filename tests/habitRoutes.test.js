const request = require('supertest');
const app = require('../src/index');
const { habitStore } = require('../src/routes/habitRoutes');

describe('Habit Tracker API', () => {
  beforeEach(() => {
    // Clear and seed data before each test
    habitStore.seed();
  });

  describe('GET /api/habits', () => {
    it('should return all habits', async () => {
      const response = await request(app)
        .get('/api/habits')
        .expect('Content-Type', /json/);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(3);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter active habits', async () => {
      const habit = habitStore.findAll()[0];
      // First deactivate a habit
      await request(app)
        .put(`/api/habits/${habit.id}`)
        .send({ isActive: false });

      const response = await request(app)
        .get('/api/habits?active=true');
      
      expect(response.body.count).toBe(2);
    });

    it('should filter habits by date', async () => {
      const habit = habitStore.findAll()[0];
      habitStore.markComplete(habit.id, '2024-01-15');

      const response = await request(app)
        .get('/api/habits?date=2024-01-15');
      
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].name).toBe(habit.name);
    });
  });

  describe('GET /api/habits/:id', () => {
    it('should return a habit by id', async () => {
      const habit = habitStore.findAll()[0];
      
      const response = await request(app)
        .get(`/api/habits/${habit.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(habit.id);
    });

    it('should return 404 for non-existent habit', async () => {
      const response = await request(app)
        .get('/api/habits/non-existent-id');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/habits', () => {
    it('should create a new habit', async () => {
      const newHabit = {
        name: 'Drink Water',
        description: 'Drink 8 glasses of water daily',
        frequency: 'daily'
      };

      const response = await request(app)
        .post('/api/habits')
        .send(newHabit);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newHabit.name);
      expect(response.body.data).toHaveProperty('id');
    });

    it('should return 400 for invalid habit data', async () => {
      const invalidHabit = {
        name: '', // Empty name should fail validation
        frequency: 'invalid'
      };

      const response = await request(app)
        .post('/api/habits')
        .send(invalidHabit);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for missing name', async () => {
      const response = await request(app)
        .post('/api/habits')
        .send({ description: 'No name provided' });
      
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/habits/:id', () => {
    it('should update an existing habit', async () => {
      const habit = habitStore.findAll()[0];
      const updatedData = {
        name: 'Updated Exercise',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/habits/${habit.id}`)
        .send(updatedData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updatedData.name);
    });

    it('should return 404 for non-existent habit', async () => {
      const response = await request(app)
        .put('/api/habits/non-existent-id')
        .send({ name: 'Test' });
      
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/habits/:id', () => {
    it('should delete a habit', async () => {
      const habit = habitStore.findAll()[0];
      
      const response = await request(app)
        .delete(`/api/habits/${habit.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      // Verify it's deleted
      const checkResponse = await request(app)
        .get(`/api/habits/${habit.id}`);
      expect(checkResponse.status).toBe(404);
    });

    it('should return 404 for non-existent habit', async () => {
      const response = await request(app)
        .delete('/api/habits/non-existent-id');
      
      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/habits/:id/complete', () => {
    it('should mark habit as complete', async () => {
      const habit = habitStore.findAll()[0];
      
      const response = await request(app)
        .patch(`/api/habits/${habit.id}/complete`)
        .send({ date: '2024-01-20' });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.completedDates).toContain('2024-01-20');
    });

    it('should return 404 for non-existent habit', async () => {
      const response = await request(app)
        .patch('/api/habits/non-existent-id/complete')
        .send({ date: '2024-01-20' });
      
      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/habits/:id/incomplete', () => {
    it('should mark habit as incomplete', async () => {
      const habit = habitStore.findAll()[0];
      
      // First mark as complete
      await request(app)
        .patch(`/api/habits/${habit.id}/complete`)
        .send({ date: '2024-01-20' });
      
      // Then mark as incomplete
      const response = await request(app)
        .patch(`/api/habits/${habit.id}/incomplete`)
        .send({ date: '2024-01-20' });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.completedDates).not.toContain('2024-01-20');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});

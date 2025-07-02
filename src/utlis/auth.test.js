const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Auth Routes', () => {
  it('debería loguear y devolver un token', async () => {
    const res = await request.post('/api/auth/login').send({
      email: 'duchimazadiego68@gmail.com',
      password: 'Prueba1.'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

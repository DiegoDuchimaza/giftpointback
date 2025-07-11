const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let token;

beforeAll(async () => {
  const res = await request.post('/api/auth/login').send({
    email: 'duchimazadiego68@gmail.com',
    password: 'Prueba1.'
  });

  token = res.body.token;
});

describe('Giftcard Routes', () => {
  it('debería devolver 200 con token válido', async () => {
    const res = await request
      .get('/api/giftcards')
      .set('Authorization', `${token}`);

    expect(res.statusCode).toBe(200);
  });

  it('debería devolver una lista (vacía o no)', async () => {
    const res = await request
      .get('/api/giftcards')
      .set('Authorization', `${token}`);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

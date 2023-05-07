const request = require('supertest');
const app = require('../src/app');
const { connect , closeDatabase } = require("./db-handler");

let token;

beforeAll(async () => await connect());

afterAll(async () => await closeDatabase());


describe('API Token Test', () => {
  test('should signup a new user and get token', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        nama: 'user23',
        email: 'user23@test.com',
        password: 'password2'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('berhasil register');

    const res2 = await request(app)
      .post('/auth/signin')
      .send({
        email: 'user23@test.com',
        password: 'password2'
      });

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.message).toEqual('berhasil login');

    token = res2.body.data;
  });

  test('should be able to access protected route with token', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('berhasil get profile');
  });

  test('should return 401 unauthorized without token', async () => {
    const res = await request(app)
      .get('/user');

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Token is null');
  });

  test('should return 401 unauthorized with invalid token', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer invalidToken`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('Token is not valid');
  });
});

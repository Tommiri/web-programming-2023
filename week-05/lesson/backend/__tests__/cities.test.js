const {
  describe,
  expect,
  test,
  afterAll,
  beforeAll,
} = require('@jest/globals');
const request = require('supertest');

const app = require('../app');
const pool = require('../db/pool');

const loggedInUser = {
  userId: '',
  email: '',
  token: '',
};

beforeAll(async () => {
  pool.query('DELETE FROM users WHERE email=$1', [
    'john.wayne@domain.com',
  ]);

  const data = {
    name: 'John Wayne',
    email: 'john.wayne@domain.com',
    password: 'password123',
  };

  const response = await request(app)
    .post('/api/users/signup')
    .set('Accept', 'application/json')
    .send(data);

  loggedInUser.userId = response.body.userId;
  loggedInUser.email = response.body.email;
  loggedInUser.token = response.body.token;
});

describe('GET cities endpoint', () => {
  test('should return 200', (done) => {
    request(app).get('/api/cities').expect(200).end(done);
  });

  test('should return status 200 and valid json', async () => {
    const response = await request(app)
      .get('/api/cities')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          capital: 'Oslo',
          country: 'Norway',
        }),
        expect.objectContaining({
          id: 2,
          capital: 'Pretoria',
          country: 'South Africa',
        }),
        expect.objectContaining({
          id: 3,
          capital: 'Helsinki',
          country: 'Finland',
        }),
      ])
    );
  });
});

describe('GET city by id endpoint', () => {
  test('should return 200 if found', (done) => {
    request(app).get('/api/cities/1').expect(200).end(done);
  });

  test('should return 200 and json if found', async () => {
    const response = await request(app)
      .get('/api/cities/1')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        capital: 'Oslo',
        country: 'Norway',
      })
    );
  });
});

describe('POST city endpoint', () => {
  afterAll(async () => {
    const deleteQuery = `DELETE FROM cities WHERE capital LIKE 'Test Town' AND country LIKE 'Test Country';`;
    pool.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test('should create a new city', async () => {
    const city = {
      capital: 'Test Town',
      country: 'Test Country',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Content', 'application/json')
      .send(city);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.capital).toEqual('Test Town');
    expect(response.body.country).toEqual('Test Country');
  });

  test('should not allow no capital property', async () => {
    const city = {
      country: 'Test Country',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"capital" is required');
  });

  test('should not allow no country property', async () => {
    const city = {
      capital: 'Test Town',
    };

    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"country" is required');
  });

  test('should not allow empty capital', async () => {
    const city = {
      capital: '',
      country: 'Test Country',
    };
    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"capital" is not allowed to be empty'
    );
  });

  test('should not allow empty country', async () => {
    const city = {
      capital: 'Test Town',
      country: '',
    };
    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"country" is not allowed to be empty'
    );
  });

  test('should not allow too short capital', async () => {
    const city = {
      capital: 'C',
      country: 'Test Country',
    };
    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"capital" length must be at least 4 characters long'
    );
  });

  test('should not allow too short country', async () => {
    const city = {
      capital: 'Test Town',
      country: 'S',
    };
    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    console.log(response.body);
    expect(response.text).toContain(
      '"country" length must be at least 4 characters long'
    );
  });

  test('should not allow a duplicate city', async () => {
    const city = {
      capital: 'Oslo',
      country: 'Norway',
    };
    const response = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('City already exists');
  });
});

describe('DELETE cities endpoint', () => {
  test('should delete the city by id', async () => {
    const city = {
      capital: 'Test Town Delete',
      country: 'Crazy Country Delete',
    };

    const postResponse = await request(app)
      .post('/api/cities')
      .set('Accept', 'application/json')
      .send(city);

    const postId = postResponse.body.id;
    const response = await request(app)
      .delete(`/api/cities/${postId}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('City deleted');
  });

  test('should check that city with id exists', async () => {
    const response = await request(app)
      .delete('/api/cities/100001')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });
});

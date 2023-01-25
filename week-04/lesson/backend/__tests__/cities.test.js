const { describe, expect, test } = require('@jest/globals');
const supertest = require('supertest');

const app = require('../app');

describe('GET cities endpoint', () => {
  test('should return status 200', (done) => {
    supertest(app).get('/api/cities').expect(200).end(done);
  });
});

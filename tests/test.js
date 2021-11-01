/* eslint-disable no-undef */
const app = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);


describe('Test Suite Setup', () => {
  it('should confirm truth', () => {
    expect(true).toEqual(true);
  });
});

describe('Test Suite Setup', () => {
  it('should confirm false', () => {
    expect(false).toEqual(false);
  });
});


describe('Endpoint TestS', () => {
  it('tests get to /reviews', async done => {
    const response = await request.get('/reviews')
    expect(response.status).toBe(200)
    done()
  })

  it('tests get to /meta', async done => {
    const response = await request.get('/meta')
    expect(response.status).toBe(200)
    done()
  })

  it('tests post to /reviews', async done => {
    const response = await request.post('/reviews')
    expect(response.status).toBe(200)
    done()
  })

  it('tests put to /reviews/helpful', async done => {
    const response = await request.get('/reviews/30000/helpful')
    expect(response.status).toBe(200)
    done()
  })

  it('tests put to /reviews/report', async done => {
    const response = await request.get('/reviews/30000/report')
    expect(response.status).toBe(200)
    done()
  })

});


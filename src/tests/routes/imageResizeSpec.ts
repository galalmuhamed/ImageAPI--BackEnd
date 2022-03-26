import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test Route /resize', () => {
  it('response should be 404 if no parameters', async () => {
    const response = await request.get('/resize');
    expect(response.status).toBe(404);
  });
  it('response should be 404 if file name is incorrect', async () => {
    const response = await request.get(
      '/resize?filename=fjorddd&height=200&width=200'
    );
    expect(response.status).toBe(404);
  });
  it('response should be 200 if we enter correct parameters', (done) => {
    request.get('/resize?filename=fjord&height=200&width=200');
    expect(200);
    done();
  });
});

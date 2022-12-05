import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../app';
import constants from '../utils/constants';
dotenv.config();

describe('Global', () => {
  afterAll(() => {
    server.close();
  });

  describe('App', () => {
    it('Should return a 200 status code when hiting the healthcheck endpoint',async () => {
      const response = await request(server)
        .get('/healthcheck');
      expect(response.status).toEqual(constants.statusCodes.ok);
    });
    it('Should return a 404 status code when hiting a non existing endpoint',async () => {
      const response = await request(server)
        .get('/nonexistingendpoint/lol');
      expect(response.status).toEqual(constants.statusCodes.notFound);
      expect(response.body.message).toEqual('Endpoint not found, check if the URL is correct');
    });
  });
});
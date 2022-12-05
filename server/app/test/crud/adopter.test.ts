import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import adopterMocks from '../mocks/adopter.mocks';
import constants from '../../utils/constants';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;

const model = 'Adopter';

describe(`${model} controller`, () => {
  afterAll(() => {
    server.close();
  });

  describe('Retrieve all', () => {
    describe('Invalid', () => {
      it('Should give you unauthorized when you are not logged in', async () => {
        const response = await request(server).get(
          `/api/v1/${model.toLowerCase()}`
        );
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });
      it(`Should not be allowed to retrieve all ${model.toLowerCase()}s if is not an admin`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const userToken = loginResponse.body.token;

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + userToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          'You have to be a admin to perform this operation'
        );
      });
    });

    describe('Valid', () => {
      it(`Should be able to retrieve all ${model.toLowerCase()}s if admin`, async () => {
        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model}s retrieved successfully!`);
        expect(Array.isArray(body.data)).toBeTruthy();
      });
    });

    describe('Internal server error', () => {
      it('Should throw internal server error in retrieveAll', async () => {
        const response = await request(server)
          .get('/api/v1/adopter?ise=yes')
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(500);
      });
    })
  });

  describe('Retrieve one', () => {
    let adopterId = '';
    let adopterToken = '';

    beforeEach(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      adopterId = loginResponse.body.data;
      adopterToken = loginResponse.body.token;
    });

    describe('Invalid', () => {
      it('Should give you unauthorized when you are not logged in', async () => {
        const response = await request(server).get(
          `/api/v1/${model.toLowerCase()}/` + adopterId
        );
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });

      it(`Should not be allowed to retrieve an ${model.toLowerCase()} if is not an admin or a shelter`, async () => {
        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/` + adopterId)
          .set('Authorization', 'Bearer ' + adopterToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          'You have to be a shelter to perform this operation'
        );
      });
      it('Should receive a 404 message when the adopter is not found', async () => {
        const nonExistingId = '42e0b97c-9c7c-4be9-825b-788e9b1fb4bb';

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/${nonExistingId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.notFound);
        expect(body.message).toEqual(
          `${model} with id ${nonExistingId} not found.`
        );
      });
    });

    describe('Valid', () => {
      it(`Should be allowed to retrieve an ${model.toLowerCase()} if is a shelter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validNonModelLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const shelterToken = loginResponse.body.token;

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/` + adopterId)
          .set('Authorization', 'Bearer ' + shelterToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} retrieved successfully!`);
        expect(typeof body.data).toBe('object');
      });

      it(`Should be allowed to retrieve an ${model.toLowerCase()} if is a shelter`, async () => {
        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/` + adopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} retrieved successfully!`);
        expect(typeof body.data).toBe('object');
      });
    });
  });

  describe('Create', () => {
    describe('Invalid', () => {
      it(`Should not create an ${model.toLowerCase()} if attributes are missing`, async () => {
        for (const key of Object.keys(adopterMocks.validCreateObject)) {
          const response = await request(server)
            .post(`/api/v1/${model.toLowerCase()}`)
            .send({
              [key]: adopterMocks.validCreateObject[key]
            });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0]).not.toContain(key);
          expect(body.token).toBeUndefined();
        }
      });

      it(`Should not create an ${model.toLowerCase()} if invalid attributes are passed`, async () => {
        const obj: { [key: string]: unknown } = {};
        for (const key of Object.keys(adopterMocks.invalidObject)) {
          obj[key] = adopterMocks.invalidObject[key];
          const response = await request(server)
            .post(`/api/v1/${model.toLowerCase()}`)
            .send(obj);
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain(
            key.toLowerCase().split('_')[0]
          );
          expect(body.token).toBeUndefined();
          if (key !== 'password')
            obj[key] = adopterMocks.validCreateObject[key];
        }

        const response = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .send(adopterMocks.invalidObject);
        const { status, body } = response;
        expect(status).toEqual(constants.statusCodes.badRequest);
        expect(body.token).toBeUndefined();
      });
    });

    describe('Valid', () => {
      it(`Should create an ${model.toLowerCase()} if valid attributes are provided`, async () => {
        const response = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .send(adopterMocks.validCreateObject);

        expect(response.status).toEqual(constants.statusCodes.created);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('data');
        expect(response.body.message).toEqual('Adopter created succesfully!');
        const createdId = response.body.data;
        const token = response.body.token;

        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + createdId)
          .set('Authorization', 'Bearer ' + token);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          'Adopter deleted succesfully!'
        );
      });
    });

    describe('Internal server error', () => {
      it('Should throw internal server error in create', async () => {
        const response = await request(server)
          .post('/api/v1/adopter?ise=yes')
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(adopterMocks.validCreateObject);

        expect(response.status).toEqual(500);
      });
    })
  });

  describe('Update', () => {
    let adopterId = '';
    let adopterToken = '';

    beforeEach(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      adopterId = loginResponse.body.data;
      adopterToken = loginResponse.body.token;
    });

    describe('Invalid', () => {
      it('Should give you unauthorized when you are not logged in', async () => {
        const response = await request(server).put(
          `/api/v1/${model.toLowerCase()}/` + adopterId
        );
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });

      it(`Should not let update a ${model.toLowerCase()} if the user is a shelter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validNonModelLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const shelterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
          .set('Authorization', 'Bearer ' + shelterToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          `You have to be a ${model.toLowerCase()} to perform this operation`
        );
      });

      it(`Should not be able to update a ${model.toLowerCase()} if the ${model.toLowerCase()} logged in is not the same as the one trying to be updated`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin2);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const shelterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
          .set('Authorization', 'Bearer ' + shelterToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          'You can only perform this operation for yourself'
        );
      });
      it(`Should not update a ${model.toLowerCase()} if invalid attributes are passed`, async () => {
        for (const key of Object.keys(adopterMocks.invalidObject)) {
          const response = await request(server)
            .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
            .set('Authorization', 'Bearer ' + adopterToken)
            .send({ [key]: adopterMocks.invalidObject[key] });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain(
            key.toLowerCase().split('_')[0]
          );
        }

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
          .set('Authorization', 'Bearer ' + adopterToken)
          .send(adopterMocks.invalidObject);
        const { status } = response;
        expect(status).toEqual(constants.statusCodes.badRequest);
      });

      it(`Should receive a 404 message when the ${model.toLowerCase()} is not found`, async () => {
        const nonExistingId = '42e0b97c-9c7c-4be9-825b-788e9b1fb4bb';

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${nonExistingId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.notFound);
        expect(body.message).toEqual(
          `${model} with id ${nonExistingId} not found.`
        );
      });
    });
    describe('Valid', () => {
      it(`Should be able to edit a ${model.toLowerCase()} if valid attributes are passed`, async () => {
        for (const key of Object.keys(adopterMocks.validUpdateObject)) {
          const response = await request(server)
            .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
            .set('Authorization', 'Bearer ' + adopterToken)
            .send({ [key]: adopterMocks.validUpdateObject[key] });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model} updated succesfully!`);
        }

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
          .set('Authorization', 'Bearer ' + adopterToken)
          .send(adopterMocks.validUpdateObject);
        const { status, body } = response;
        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} updated succesfully!`);
      });
      it(`Should let update a ${model.toLowerCase()} if the user is an admin`, async () => {
        for (const key of Object.keys(adopterMocks.validUpdateObject)) {
          const response = await request(server)
            .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
            .send({ [key]: adopterMocks.validUpdateObject[key] });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model} updated succesfully!`);
        }

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${adopterId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(adopterMocks.validUpdateObject);
        const { status, body } = response;
        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} updated succesfully!`);
      });
    });
  });

  describe('Delete', () => {
    let adopterToken = '';

    beforeEach(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      adopterToken = loginResponse.body.token;
    });

    describe('Invalid', () => {
      let deletedAdopterId = '';
      // HOOKS
      beforeAll(async () => {
        const createResponse = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .send(adopterMocks.validCreateObject);

        expect(createResponse.status).toEqual(constants.statusCodes.created);
        expect(createResponse.body).toHaveProperty('token');
        expect(createResponse.body).toHaveProperty('data');
        expect(createResponse.body.message).toEqual(
          'Adopter created succesfully!'
        );
        deletedAdopterId = createResponse.body.data;
      });

      afterAll(async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAdopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          'Adopter deleted succesfully!'
        );
      });

      // ASSERTIONS
      it('Should throw an error when the id has invalid format', async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAdopterId + '1')
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(responseDelete.status).toEqual(constants.statusCodes.badRequest);
        expect(responseDelete.body.message[0]).toEqual(
          '"id" must be a valid GUID'
        );
      });
      it(`Should not be able to delete another ${model.toLowerCase()}`, async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAdopterId)
          .set('Authorization', 'Bearer ' + adopterToken);

        expect(responseDelete.status).toEqual(
          constants.statusCodes.unAuthorized
        );
        expect(responseDelete.body.message).toEqual(
          'You can only perform this operation for yourself'
        );
      });
      it(`Should receive a 404 message when the ${model.toLowerCase()} is not found`, async () => {
        const nonExistingId = '42e0b97c-9c7c-4be9-825b-788e9b1fb4bb';

        const response = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/${nonExistingId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.notFound);
        expect(body.message).toEqual(
          `${model} with id ${nonExistingId} not found.`
        );
      });
    });
    describe('Valid', () => {
      let deletedAdopterId = '';
      let deletedAdopterToken = '';
      // HOOKS
      beforeEach(async () => {
        const createResponse = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .send(adopterMocks.validCreateObject);

        expect(createResponse.status).toEqual(constants.statusCodes.created);
        expect(createResponse.body).toHaveProperty('token');
        expect(createResponse.body).toHaveProperty('data');
        expect(createResponse.body.message).toEqual(
          'Adopter created succesfully!'
        );
        deletedAdopterId = createResponse.body.data;
        deletedAdopterToken = createResponse.body.token;
      });

      it('Should be able to delete himself', async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAdopterId)
          .set('Authorization', 'Bearer ' + deletedAdopterToken);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          'Adopter deleted succesfully!'
        );
      });
      it('Should be able to be deleted by the admin', async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAdopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          'Adopter deleted succesfully!'
        );
      });
    });
  });
});

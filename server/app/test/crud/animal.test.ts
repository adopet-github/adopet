import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import animalMocks from '../mocks/animal.mocks';
import constants from '../../utils/constants';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;

const model = 'Animal';

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
      it(`Should not be allowed to retrieve all ${model.toLowerCase()}s if is not an adopter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validShelterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const userToken = loginResponse.body.token;

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + userToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          'You have to be a adopter to perform this operation'
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

      it(`Should be able to retrieve all ${model.toLowerCase()}s if adopter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validAdopterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const userToken = loginResponse.body.token;

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + userToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model}s retrieved successfully!`);
        expect(Array.isArray(body.data)).toBeTruthy();
      });
    });
  });

  describe('Retrieve one', () => {
    let animalId = '';
    let animalOwnerToken = '';
    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(animalMocks.validShelterLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');

      animalOwnerToken = loginResponse.body.token;

      const createAnimalResponse = await request(server)
        .post(`/api/v1/${model.toLowerCase()}`)
        .set('Authorization', 'Bearer ' + animalOwnerToken)
        .send({
          ...animalMocks.validCreateObject,
          shelterId: loginResponse.body.data
        });

      expect(createAnimalResponse.status).toEqual(
        constants.statusCodes.created
      );
      expect(createAnimalResponse.body).toHaveProperty('data');
      animalId = createAnimalResponse.body.data.animal.id;
    });

    afterAll(async () => {
      const response = await request(server)
        .delete(`/api/v1/${model.toLowerCase()}/` + animalId)
        .set('Authorization', 'Bearer ' + animalOwnerToken);
      const { status, body } = response;

      expect(status).toEqual(constants.statusCodes.ok);
      expect(body.message).toEqual(`${model} deleted succesfully!`);
    });

    describe('Invalid', () => {
      it('Should give you unauthorized when you are not logged in', async () => {
        const response = await request(server).get(
          `/api/v1/${model.toLowerCase()}/` + animalId
        );
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });

      it(`Should receive a 404 message when the ${model.toLowerCase()} is not found`, async () => {
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
      it(`Should be allowed to retrieve an ${model.toLowerCase()} if is an adopter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validAdopterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const token = loginResponse.body.token;

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/` + animalId)
          .set('Authorization', 'Bearer ' + token);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} retrieved successfully!`);
        expect(typeof body.data).toBe('object');
      });

      it(`Should be allowed to retrieve an ${model.toLowerCase()} if is a shelter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validShelterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const token = loginResponse.body.token;

        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/` + animalId)
          .set('Authorization', 'Bearer ' + token);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} retrieved successfully!`);
        expect(typeof body.data).toBe('object');
      });

      it(`Should be allowed to retrieve an ${model.toLowerCase()} if is an admin`, async () => {
        const response = await request(server)
          .get(`/api/v1/${model.toLowerCase()}/` + animalId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} retrieved successfully!`);
        expect(typeof body.data).toBe('object');
      });
    });
  });

  describe('Create', () => {
    let shelterId = '';
    let shelterToken = '';

    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(animalMocks.validShelterLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');

      shelterToken = loginResponse.body.token;
      shelterId = loginResponse.body.data;
    });

    describe('Invalid', () => {
      it(`Should not create an ${model.toLowerCase()} if attributes are missing`, async () => {
        for (const key of Object.keys(animalMocks.validCreateObject)) {
          const response = await request(server)
            .post(`/api/v1/${model.toLowerCase()}`)
            .set('Authorization', 'Bearer ' + shelterToken)
            .send({
              [key]: animalMocks.validCreateObject[key]
            });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0]).not.toContain(key);
          expect(body.token).toBeUndefined();
        }
      });

      it(`Should not create an ${model.toLowerCase()} if invalid attributes are passed`, async () => {
        const obj: { [key: string]: unknown } = {};
        for (const key of Object.keys(animalMocks.invalidObject)) {
          obj[key] = animalMocks.invalidObject[key];
          const response = await request(server)
            .post(`/api/v1/${model.toLowerCase()}`)
            .set('Authorization', 'Bearer ' + shelterToken)
            .send(obj);
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain(
            key.toLowerCase().split('_')[0]
          );
          if (key !== 'weight') obj[key] = animalMocks.validCreateObject[key];
        }

        const response = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send(animalMocks.invalidObject);
        const { status } = response;
        expect(status).toEqual(constants.statusCodes.badRequest);
      });

      it(`Should not create an ${model.toLowerCase()} if valid attributes are provided but no authorization`, async () => {
        const response = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .send({ ...animalMocks.validCreateObject, shelterId });

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
      });
    });

    describe('Valid', () => {
      it(`Should create an ${model.toLowerCase()} if valid attributes are provided and his own shelter is authenticted`, async () => {
        const response = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({ ...animalMocks.validCreateObject, shelterId });

        expect(response.status).toEqual(constants.statusCodes.created);
        expect(response.body).toHaveProperty('data');
        expect(response.body.message).toEqual(`${model} created succesfully!`);
        const createdId = response.body.data.animal.id;

        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + createdId)
          .set('Authorization', 'Bearer ' + shelterToken);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          `${model} deleted succesfully!`
        );
      });
      it(`Should create an ${model.toLowerCase()} if valid attributes are provided and the user is admin`, async () => {
        const response = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({ ...animalMocks.validCreateObject, shelterId });

        expect(response.status).toEqual(constants.statusCodes.created);
        expect(response.body).toHaveProperty('data');
        expect(response.body.message).toEqual(`${model} created succesfully!`);
        const createdId = response.body.data.animal.id;

        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + createdId)
          .set('Authorization', 'Bearer ' + shelterToken);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          `${model} deleted succesfully!`
        );
      });
    });
  });

  describe('Update', () => {
    let shelterId = '';
    let shelterToken = '';
    let animalId = '';

    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(animalMocks.validShelterLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      shelterToken = loginResponse.body.token;
      shelterId = loginResponse.body.data;

      const createdAnimal = await request(server)
        .post(`/api/v1/${model.toLowerCase()}`)
        .set('Authorization', 'Bearer ' + shelterToken)
        .send({ ...animalMocks.validCreateObject, shelterId });

      expect(createdAnimal.status).toEqual(constants.statusCodes.created);
      expect(createdAnimal.body).toHaveProperty('data');
      animalId = createdAnimal.body.data.animal.id;
    });
    afterAll(async () => {
      const response = await request(server)
        .delete(`/api/v1/${model.toLowerCase()}/${animalId}`)
        .set('Authorization', 'Bearer ' + shelterToken);
      expect(response.status).toEqual(constants.statusCodes.ok);
    });

    describe('Invalid', () => {
      it('Should give you unauthorized when you are not logged in', async () => {
        const response = await request(server).put(
          `/api/v1/${model.toLowerCase()}/` + animalId
        );
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });

      it(`Should not let update a ${model.toLowerCase()} if the user is an adopter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validAdopterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const adopterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${shelterId}`)
          .set('Authorization', 'Bearer ' + adopterToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          'You have to be a shelter to perform this operation'
        );
      });

      it(`Should not be able to update a ${model.toLowerCase()} if the shelter logged in is not the owner of the ${model.toLowerCase()}`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validShelterLogin2);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const shelterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken);
        const { status, body } = response;

        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual(
          `You can only perform this operation for your own shelter ${model.toLowerCase()}s`
        );
      });
      it(`Should not update a ${model.toLowerCase()} if invalid attributes are passed`, async () => {
        for (const key of Object.keys(animalMocks.invalidObject)) {
          const response = await request(server)
            .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
            .set('Authorization', 'Bearer ' + shelterToken)
            .send({ [key]: animalMocks.invalidObject[key] });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain(
            key.toLowerCase().split('_')[0]
          );
        }

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send(animalMocks.invalidObject);
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
      it(`Should be able to edit a ${model.toLowerCase()} if valid attributes are passed and the user is his own shelter`, async () => {
        for (const key of Object.keys(animalMocks.validUpdateObject)) {
          const response = await request(server)
            .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
            .set('Authorization', 'Bearer ' + shelterToken)
            .send({ [key]: animalMocks.validUpdateObject[key] });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model} updated succesfully!`);
        }

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send(animalMocks.validUpdateObject);
        const { status, body } = response;
        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} updated succesfully!`);
      });
      it(`Should let update a ${model.toLowerCase()} if the user is an admin`, async () => {
        for (const key of Object.keys(animalMocks.validUpdateObject)) {
          const response = await request(server)
            .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
            .send({ [key]: animalMocks.validUpdateObject[key] });
          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model} updated succesfully!`);
        }

        const response = await request(server)
          .put(`/api/v1/${model.toLowerCase()}/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(animalMocks.validUpdateObject);
        const { status, body } = response;
        expect(status).toEqual(constants.statusCodes.ok);
        expect(body.message).toEqual(`${model} updated succesfully!`);
      });
    });
  });

  describe('Delete', () => {
    let shelterId = '';
    let shelterToken = '';
    describe('Invalid', () => {
      let animalId = '';

      beforeAll(async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validShelterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');
        shelterToken = loginResponse.body.token;
        shelterId = loginResponse.body.data;

        const createdAnimal = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({ ...animalMocks.validCreateObject, shelterId });

        expect(createdAnimal.status).toEqual(constants.statusCodes.created);
        expect(createdAnimal.body).toHaveProperty('data');
        animalId = createdAnimal.body.data.animal.id;
      });
      afterAll(async () => {
        const response = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken);
        expect(response.status).toEqual(constants.statusCodes.ok);
      });

      // ASSERTIONS
      it('Should throw an error when the id has invalid format', async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + animalId + '1')
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(responseDelete.status).toEqual(constants.statusCodes.badRequest);
        expect(responseDelete.body.message[0]).toEqual(
          '"id" must be a valid GUID'
        );
      });
      it('Should not be able to be deleted by another shelter', async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(animalMocks.validShelterLogin2);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');

        const shelterTokenInvalid = loginResponse.body.token;

        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + animalId)
          .set('Authorization', 'Bearer ' + shelterTokenInvalid);

        expect(responseDelete.status).toEqual(
          constants.statusCodes.unAuthorized
        );
        expect(responseDelete.body.message).toEqual(
          `You can only perform this operation for your own shelter ${model.toLowerCase()}s`
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
      let deletedAnimalId = '';
      // HOOKS
      beforeEach(async () => {
        const createResponse = await request(server)
          .post(`/api/v1/${model.toLowerCase()}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({ ...animalMocks.validCreateObject, shelterId });

        expect(createResponse.status).toEqual(constants.statusCodes.created);
        expect(createResponse.body).toHaveProperty('data');
        expect(createResponse.body.message).toEqual(
          `${model} created succesfully!`
        );
        deletedAnimalId = createResponse.body.data.animal.id;
      });

      it('Should be able to be deleted by his own shelter', async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAnimalId)
          .set('Authorization', 'Bearer ' + shelterToken);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          `${model} deleted succesfully!`
        );
      });
      it('Should be able to be deleted by the admin', async () => {
        const responseDelete = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/` + deletedAnimalId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(responseDelete.status).toEqual(constants.statusCodes.ok);
        expect(responseDelete.body.message).toEqual(
          `${model} deleted succesfully!`
        );
      });
    });
  });
});

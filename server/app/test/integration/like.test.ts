import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import adopterMocks from '../mocks/adopter.mocks';
import constants from '../../utils/constants';
import animalMocks from '../mocks/animal.mocks';
import shelterMocks from '../mocks/shelter.mocks';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;

describe('Likes and dislikes', () => {
  afterAll(() => {
    server.close();
  });
  const notFoundId = '082b8cd4-e8f4-4451-9430-2d3fc7182c37';
  describe('Likes', () => {
    let adopterId = '';
    let adopterToken = '';
    let shelterId = '';
    let shelterToken = '';
    let animalId = '';
    let adopter2Token = '';

    describe('Invalid', () => {
      beforeAll(async () => {
        const createAdopterResponse = await request(server)
          .post('/api/v1/adopter')
          .send(adopterMocks.validCreateObject);

        expect(createAdopterResponse.status).toEqual(
          constants.statusCodes.created
        );
        adopterId = createAdopterResponse.body.data;
        adopterToken = createAdopterResponse.body.token;

        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validNonModelLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        shelterId = loginResponse.body.data;
        shelterToken = loginResponse.body.token;

        const createAnimalResponse = await request(server)
          .post('/api/v1/animal')
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({
            ...animalMocks.validCreateObject,
            shelterId: loginResponse.body.data
          });

        expect(createAnimalResponse.status).toEqual(
          constants.statusCodes.created
        );
        animalId = createAnimalResponse.body.data.animal.id;

        const loginResponse2 = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin);

        expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
        adopter2Token = loginResponse2.body.token;
      });

      afterAll(async () => {
        const deleteAdopterReponse = await request(server)
          .delete('/api/v1/adopter/' + adopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAdopterReponse.status).toEqual(constants.statusCodes.ok);

        const deleteAnimalResponse = await request(server)
          .delete('/api/v1/animal/' + animalId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAnimalResponse.status).toEqual(constants.statusCodes.ok);
      });
      it('Should not be able to like an animal if the logged in user is a shelter', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'You have to be a adopter to perform this operation'
        );
      });
      it('Should not be able to perform a like operation for another adopter', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + adopter2Token);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'You can only perform this operation for yourself'
        );
      });
      it('Should not like an animal if the adopter does not exist', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${notFoundId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          `Adopter with id ${notFoundId} not found.`
        );
      });
      it('Should not like an animal if the animal does not exist', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${notFoundId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          `Animal with id ${notFoundId} not found.`
        );
      });
      it('Should not like an animal when the adopter id is not valid', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}1/like/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message[0]).toEqual(
          '"adopterId" must be a valid GUID'
        );
      });
      it('Should not like an animal when the animal id is not valid', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}1`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message[0]).toEqual(
          '"animalId" must be a valid GUID'
        );
      });
    });
    describe('Valid', () => {
      beforeEach(async () => {
        const createAdopterResponse = await request(server)
          .post('/api/v1/adopter')
          .send(adopterMocks.validCreateObject);

        expect(createAdopterResponse.status).toEqual(
          constants.statusCodes.created
        );
        adopterId = createAdopterResponse.body.data;
        adopterToken = createAdopterResponse.body.token;

        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validNonModelLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        shelterToken = loginResponse.body.token;

        const createAnimalResponse = await request(server)
          .post('/api/v1/animal')
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({
            ...animalMocks.validCreateObject,
            shelterId: loginResponse.body.data
          });

        expect(createAnimalResponse.status).toEqual(
          constants.statusCodes.created
        );
        animalId = createAnimalResponse.body.data.animal.id;

        const loginResponse2 = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin);

        expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
        adopter2Token = loginResponse2.body.token;
      });

      afterEach(async () => {
        const deleteAdopterReponse = await request(server)
          .delete('/api/v1/adopter/' + adopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAdopterReponse.status).toEqual(constants.statusCodes.ok);

        const deleteAnimalResponse = await request(server)
          .delete('/api/v1/animal/' + animalId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAnimalResponse.status).toEqual(constants.statusCodes.ok);
      });
      it('Should like the animal if the user is adopter', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Animal liked successfully!');

        await request(server)
          .get(`/api/v1/shelter/${shelterId}/likes`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
      });
      it('Should like the animal if the user is admin', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Animal liked successfully!');

        const coveragePurposedRetrieve = await request(server)
          .get(`/api/v1/animal/${animalId}/likes`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(coveragePurposedRetrieve.status).toEqual(constants.statusCodes.ok);
      });
    });

    describe('Internal server error', () => {
      it('Should throw internal server error in like animal', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}?ise=yes`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(500);
      });
    });
  });
  describe('Dislikes', () => {
    let adopterId = '';
    let adopterToken = '';
    let shelterToken = '';
    let animalId = '';
    let adopter2Token = '';

    describe('Invalid', () => {
      beforeAll(async () => {
        const createAdopterResponse = await request(server)
          .post('/api/v1/adopter')
          .send(adopterMocks.validCreateObject);

        expect(createAdopterResponse.status).toEqual(
          constants.statusCodes.created
        );
        adopterId = createAdopterResponse.body.data;
        adopterToken = createAdopterResponse.body.token;

        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validNonModelLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        shelterToken = loginResponse.body.token;

        const createAnimalResponse = await request(server)
          .post('/api/v1/animal')
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({
            ...animalMocks.validCreateObject,
            shelterId: loginResponse.body.data
          });

        expect(createAnimalResponse.status).toEqual(
          constants.statusCodes.created
        );
        animalId = createAnimalResponse.body.data.animal.id;

        const loginResponse2 = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin);

        expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
        adopter2Token = loginResponse2.body.token;
      });

      afterAll(async () => {
        const deleteAdopterReponse = await request(server)
          .delete('/api/v1/adopter/' + adopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAdopterReponse.status).toEqual(constants.statusCodes.ok);

        const deleteAnimalResponse = await request(server)
          .delete('/api/v1/animal/' + animalId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAnimalResponse.status).toEqual(constants.statusCodes.ok);
      });
      it('Should not be able to dislike an animal if the logged in user is a shelter', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'You have to be a adopter to perform this operation'
        );
      });
      it('Should not be able to perform a dislike operation for another adopter', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + adopter2Token);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          'You can only perform this operation for yourself'
        );
      });
      it('Should not dislike an animal if the adopter does not exist', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${notFoundId}/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          `Adopter with id ${notFoundId} not found.`
        );
      });
      it('Should not dislike an animal if the animal does not exist', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${notFoundId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
          `Animal with id ${notFoundId} not found.`
        );
      });
      it('Should not dislike an animal when the adopter id is not valid', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}1/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message[0]).toEqual(
          '"adopterId" must be a valid GUID'
        );
      });
      it('Should not dislike an animal when the animal id is not valid', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}1`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message[0]).toEqual(
          '"animalId" must be a valid GUID'
        );
      });
    });
    describe('Valid', () => {
      beforeEach(async () => {
        const createAdopterResponse = await request(server)
          .post('/api/v1/adopter')
          .send(adopterMocks.validCreateObject);

        expect(createAdopterResponse.status).toEqual(
          constants.statusCodes.created
        );
        adopterId = createAdopterResponse.body.data;
        adopterToken = createAdopterResponse.body.token;

        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validNonModelLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        shelterToken = loginResponse.body.token;

        const createAnimalResponse = await request(server)
          .post('/api/v1/animal')
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({
            ...animalMocks.validCreateObject,
            shelterId: loginResponse.body.data
          });

        expect(createAnimalResponse.status).toEqual(
          constants.statusCodes.created
        );
        animalId = createAnimalResponse.body.data.animal.id;

        const loginResponse2 = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin);

        expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
        adopter2Token = loginResponse2.body.token;
      });

      afterEach(async () => {
        const deleteAdopterReponse = await request(server)
          .delete('/api/v1/adopter/' + adopterId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAdopterReponse.status).toEqual(constants.statusCodes.ok);

        const deleteAnimalResponse = await request(server)
          .delete('/api/v1/animal/' + animalId)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
        expect(deleteAnimalResponse.status).toEqual(constants.statusCodes.ok);
      });
      it('Should dislike the animal if the user is adopter', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Animal disliked successfully!');

        await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken);
      });
      it('Should dislike the animal if the user is admin', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Animal disliked successfully!');
      });
    });

    describe('Internal server error', () => {
      it('Should throw internal server error in dislike animal', async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopterId}/dislike/${animalId}?ise=yes`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(500);
      });
    })
  });
  describe('Getters', () => {
    let adopterToken = '';
    let shelterId = '';
    let shelterToken = '';
    let animalId = '';
    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      adopterToken = loginResponse.body.token;

      const loginResponse2 = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validNonModelLogin);

      expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
      shelterId = loginResponse2.body.data;
      shelterToken = loginResponse2.body.token;

      const createAnimalResponse = await request(server)
        .post('/api/v1/animal')
        .set('Authorization', 'Bearer ' + shelterToken)
        .send({ ...animalMocks.validCreateObject, shelterId });

      expect(createAnimalResponse.status).toEqual(
        constants.statusCodes.created
      );
      animalId = createAnimalResponse.body.data.animal.id;
    });

    describe('Shelter', () => {
      describe('Invalid', () => {
        it('Should not retrieve shelter likes if the user is an adopter', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/likes`)
            .set('Authorization', 'Bearer ' + adopterToken);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual(
            'You have to be a shelter to perform this operation'
          );
        });
        it('Should not retrieve shelter likes if the user is not himself', async () => {
          const loginResponse = await request(server)
            .post('/api/v1/auth/login')
            .send(shelterMocks.validLogin2);

          expect(loginResponse.status).toEqual(constants.statusCodes.ok);
          const shelterToken2 = loginResponse.body.token;

          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/likes`)
            .set('Authorization', 'Bearer ' + shelterToken2);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual(
            'You can only perform this operation for yourself'
          );
        });
        it('Should not retrieve shelter likes if the shelter does not exist', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${notFoundId}/likes`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(
            `Shelter with id ${notFoundId} not found.`
          );
        });
        it('Should not retrieve shelter likes if the id is not valid', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}1/likes`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.badRequest);
          expect(response.body.message[0]).toEqual('"id" must be a valid GUID');
        });
      });
      describe('Valid', () => {
        it('Should be able to retrieve all likes if the logged in user is the shelter', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/likes`)
            .set('Authorization', 'Bearer ' + shelterToken);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Likes retrieved successfully!'
          );
        });
        it('Should be able to retrieve all likes if the logged in user is an admin', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/likes`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Likes retrieved successfully!'
          );
        });
      });
    });

    describe('Animal', () => {
      describe('Invalid', () => {
        it('Should not retrieve animal likes if the user is an adopter', async () => {
          const response = await request(server)
            .get(`/api/v1/animal/${animalId}/likes`)
            .set('Authorization', 'Bearer ' + adopterToken);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual(
            'You have to be a shelter to perform this operation'
          );
        });
        it('Should not retrieve animal likes if the user is not his owner', async () => {
          const loginResponse = await request(server)
            .post('/api/v1/auth/login')
            .send(shelterMocks.validLogin2);

          expect(loginResponse.status).toEqual(constants.statusCodes.ok);
          const shelterToken2 = loginResponse.body.token;

          const response = await request(server)
            .get(`/api/v1/animal/${animalId}/likes`)
            .set('Authorization', 'Bearer ' + shelterToken2);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual(
            'You can only perform this operation for your own shelter animals'
          );
        });
        it('Should not retrieve animal likes if the animal does not exist', async () => {
          const response = await request(server)
            .get(`/api/v1/animal/${notFoundId}/likes`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(
            `Animal with id ${notFoundId} not found.`
          );
        });
        it('Should not retrieve animal likes if the id is not valid', async () => {
          const response = await request(server)
            .get(`/api/v1/animal/${animalId}1/likes`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.badRequest);
          expect(response.body.message[0]).toEqual('"id" must be a valid GUID');
        });
      });
      describe('Valid', () => {
        it('Should be able to retrieve all likes if the logged in user is the shelter', async () => {
          const response = await request(server)
            .get(`/api/v1/animal/${animalId}/likes`)
            .set('Authorization', 'Bearer ' + shelterToken);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Likes retrieved successfully!'
          );
        });
        it('Should be able to retrieve all likes if the logged in user is an admin', async () => {
          const response = await request(server)
            .get(`/api/v1/animal/${animalId}/likes`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Likes retrieved successfully!'
          );
        });
      });
    });
  });
});

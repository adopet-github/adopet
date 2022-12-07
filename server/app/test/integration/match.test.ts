import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import adopterMocks from '../mocks/adopter.mocks';
import constants from '../../utils/constants';
import animalMocks from '../mocks/animal.mocks';
import shelterMocks from '../mocks/shelter.mocks';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;

describe('Matches', () => {
  const notFoundId = '082b8cd4-e8f4-4451-9430-2d3fc7182c37';
  afterAll(() => {
    server.close();
  });

  describe('Setters', () => {
    let adopterId = '';
    let adopterToken = '';
    let shelterToken = '';
    let shelterToken2 = '';
    let animalId = '';

    describe('Dislike', () => {
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
            .send(shelterMocks.validLogin);
  
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
            .send(shelterMocks.validLogin2);
  
          expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
          shelterToken2 = loginResponse2.body.token;
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
  
        it('Should not be able to dislike an adopter if the user is not logged in', async () => {
          const response = await request(server).put(
            `/api/v1/animal/${animalId}/dislike/${adopterId}`
          );
  
          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('Unauthorized');
        });
        it('Should not be able to dislike an adopter if the user logged in is an adopter', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + adopterToken);
  
          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual(
            'You have to be a shelter to perform this operation'
          );
        });
        it('Should not be able to dislike an adopter if the user logged in is his own shelter', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + shelterToken2);
  
          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual(
            'You can only perform this operation for your own shelter animals'
          );
        });
        it('Should not be able to dislike an adopter if the animal does not exist', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${notFoundId}/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(
            `Animal with id ${notFoundId} not found.`
          );
        });
        it('Should not be able to dislike an adopter if the adopter does not exist', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${notFoundId}`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(
            `Adopter with id ${notFoundId} not found.`
          );
        });
        it('Should not be able to dislike an adopter if the animal id is not valid', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}1/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.badRequest);
          expect(response.body.message[0]).toEqual(
            '"animalId" must be a valid GUID'
          );
        });
        it('Should not be able to dislike an adopter if the adopter id is not valid', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${adopterId}1`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.badRequest);
          expect(response.body.message[0]).toEqual(
            '"adopterId" must be a valid GUID'
          );
        });
        it('Should not be able to dislike an adopter if the adopter does not like the animal', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(
            `The adopter with id ${adopterId} does not like animal with id ${animalId}`
          );
        });
      });
    });
    describe('Match', () => {
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
            .send(shelterMocks.validLogin);
  
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
            .send(shelterMocks.validLogin2);
  
          expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
          shelterToken2 = loginResponse2.body.token;
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
  
        describe('Like', () => {
          it('Should not be able to match an adopter if the user is not logged in', async () => {
            const response = await request(server).put(
              `/api/v1/animal/${animalId}/match/${adopterId}`
            );
    
            expect(response.status).toEqual(constants.statusCodes.unAuthorized);
            expect(response.body.message).toEqual('Unauthorized');
          });
          it('Should not be able to match an adopter if the user logged in is an adopter', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/match/${adopterId}`)
              .set('Authorization', 'Bearer ' + adopterToken);
    
            expect(response.status).toEqual(constants.statusCodes.unAuthorized);
            expect(response.body.message).toEqual(
              'You have to be a shelter to perform this operation'
            );
          });
          it('Should not be able to match an adopter if the user logged in is his own shelter', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/match/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken2);
    
            expect(response.status).toEqual(constants.statusCodes.unAuthorized);
            expect(response.body.message).toEqual(
              'You can only perform this operation for your own shelter animals'
            );
          });
          it('Should not be able to match an adopter if the animal does not exist', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${notFoundId}/match/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.notFound);
            expect(response.body.message).toEqual(
              `Animal with id ${notFoundId} not found.`
            );
          });
          it('Should not be able to match an adopter if the adopter does not exist', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/match/${notFoundId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.notFound);
            expect(response.body.message).toEqual(
              `Adopter with id ${notFoundId} not found.`
            );
          });
          it('Should not be able to match an adopter if the animal id is not valid', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}1/match/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.badRequest);
            expect(response.body.message[0]).toEqual(
              '"animalId" must be a valid GUID'
            );
          });
          it('Should not be able to match an adopter if the adopter id is not valid', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/match/${adopterId}1`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.badRequest);
            expect(response.body.message[0]).toEqual(
              '"adopterId" must be a valid GUID'
            );
          });
          it('Should not be able to match an adopter if the adopter does not like the animal', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/match/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.notFound);
            expect(response.body.message).toEqual(
              `The adopter with id ${adopterId} does not like animal with id ${animalId}`
            );
          });
        });
        describe('Dislike', () => {
          it('Should not be able to dislike an adopter if the user is not logged in', async () => {
            const response = await request(server).put(
              `/api/v1/animal/${animalId}/dislike/${adopterId}`
            );
    
            expect(response.status).toEqual(constants.statusCodes.unAuthorized);
            expect(response.body.message).toEqual('Unauthorized');
          });
          it('Should not be able to dislike an adopter if the user logged in is an adopter', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
              .set('Authorization', 'Bearer ' + adopterToken);
    
            expect(response.status).toEqual(constants.statusCodes.unAuthorized);
            expect(response.body.message).toEqual(
              'You have to be a shelter to perform this operation'
            );
          });
          it('Should not be able to dislike an adopter if the user logged in is his own shelter', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken2);
    
            expect(response.status).toEqual(constants.statusCodes.unAuthorized);
            expect(response.body.message).toEqual(
              'You can only perform this operation for your own shelter animals'
            );
          });
          it('Should not be able to dislike an adopter if the animal does not exist', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${notFoundId}/dislike/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.notFound);
            expect(response.body.message).toEqual(
              `Animal with id ${notFoundId} not found.`
            );
          });
          it('Should not be able to dislike an adopter if the adopter does not exist', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/dislike/${notFoundId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.notFound);
            expect(response.body.message).toEqual(
              `Adopter with id ${notFoundId} not found.`
            );
          });
          it('Should not be able to dislike an adopter if the animal id is not valid', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}1/dislike/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.badRequest);
            expect(response.body.message[0]).toEqual(
              '"animalId" must be a valid GUID'
            );
          });
          it('Should not be able to dislike an adopter if the adopter id is not valid', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/dislike/${adopterId}1`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.badRequest);
            expect(response.body.message[0]).toEqual(
              '"adopterId" must be a valid GUID'
            );
          });
          it('Should not be able to dislike an adopter if the adopter does not like the animal', async () => {
            const response = await request(server)
              .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
              .set('Authorization', 'Bearer ' + shelterToken);
    
            expect(response.status).toEqual(constants.statusCodes.notFound);
            expect(response.body.message).toEqual(
              `The adopter with id ${adopterId} does not like animal with id ${animalId}`
            );
          });
        });
      });
    });

    describe('Valid', () => {
      let shelterId = '';
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
          .send(shelterMocks.validLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        shelterToken = loginResponse.body.token;
        shelterId = loginResponse.body.data;

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
          .send(shelterMocks.validLogin2);

        expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
        shelterToken2 = loginResponse2.body.token;

        const likeResponse = await request(server)
          .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken);

        expect(likeResponse.status).toEqual(constants.statusCodes.ok);
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

      describe('Like', () => {
        it('Should match an adopter if the logged in user is his own shelter', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/match/${adopterId}`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Adopter matched successfully!'
          );
        });
        it('Should match an adopter if the logged in user is an admin', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/match/${adopterId}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
  
          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Adopter matched successfully!'
          );
  
          const coveragePurposedRetrieve = await request(server)
            .get(`/api/v1/shelter/${shelterId}/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
  
          expect(coveragePurposedRetrieve.status).toEqual(constants.statusCodes.ok);
        });
      });

      describe('Dislike', () => {
        it('Should dislike an adopter if the logged in user is his own shelter', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + shelterToken);
  
          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Adopter disliked successfully!'
          );
        });
        it('Should dislike an adopter if the logged in user is an admin', async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/dislike/${adopterId}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
  
          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual(
            'Adopter disliked successfully!'
          );
        });
      });
    });
  });
  describe('Getters', () => {
    let adopterId = '';
    let adopterToken = '';
    let adopterToken2 = '';
    let shelterToken = '';
    let shelterId = '';
    let shelterToken2 = '';

    beforeAll(async () => {
      const loginResponseAdopter = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validLogin);

      expect(loginResponseAdopter.status).toEqual(constants.statusCodes.ok);
      adopterId = loginResponseAdopter.body.data;
      adopterToken = loginResponseAdopter.body.token;

      const loginResponseAdopter2 = await request(server)
        .post('/api/v1/auth/login')
        .send(adopterMocks.validLogin2);

      expect(loginResponseAdopter2.status).toEqual(constants.statusCodes.ok);
      adopterToken2 = loginResponseAdopter2.body.token;

      const loginResponseShelter = await request(server)
        .post('/api/v1/auth/login')
        .send(shelterMocks.validLogin);

      expect(loginResponseShelter.status).toEqual(constants.statusCodes.ok);
      shelterId = loginResponseShelter.body.data;
      shelterToken = loginResponseShelter.body.token;

    const loginResponseShelter2 = await request(server)
      .post('/api/v1/auth/login')
      .send(shelterMocks.validLogin2);

      expect(loginResponseShelter2.status).toEqual(constants.statusCodes.ok);
      shelterToken2 = loginResponseShelter2.body.token;
    });

    describe('Adopter', () => {
      describe('Invalid', () => {
        it('Should not be able to retrieve all adopter matches if not logged in', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${adopterId}/matches`);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('Unauthorized');
        });
        it('Should not be able to retrieve all adopter matches if the user is not an adopter', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${adopterId}/matches`)
            .set('Authorization', 'Bearer ' + shelterToken);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('You have to be a adopter to perform this operation');
        });
        it('Should not be able to retrieve all adopter matches if the user is not himself', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${adopterId}/matches`)
            .set('Authorization', 'Bearer ' + adopterToken2);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('You can only perform this operation for yourself');
        });
        it('Should not be able to retrieve all adopter matches if the adopter is not found', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${notFoundId}/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(`Adopter with id ${notFoundId} not found.`);
        });
        it('Should not be able to retrieve all adopter matches if the adopter id is not valid', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${adopterId}1/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.badRequest);
          expect(response.body.message[0]).toEqual('"id" must be a valid GUID');
        });
      });

      describe('Valid', () => {
        it('Should retrieve all the adopter matches if the user logged in is the same adopter', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${adopterId}/matches`)
            .set('Authorization', 'Bearer ' + adopterToken);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual('Matches retrieved successfully!');
          expect(Array.isArray(response.body.data)).toBeTruthy();
        });
        it('Should retrieve all the adopter matches if the user logged in is an admin', async () => {
          const response = await request(server)
            .get(`/api/v1/adopter/${adopterId}/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual('Matches retrieved successfully!');
          expect(Array.isArray(response.body.data)).toBeTruthy();
        });
      });
    });

    describe('Shelter', () => {
      describe('Invalid', () => {
        it('Should not be able to retrieve all shelter matches if not logged in', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/matches`);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('Unauthorized');
        });
        it('Should not be able to retrieve all shelter matches if the user is not a shelter', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/matches`)
            .set('Authorization', 'Bearer ' + adopterToken);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('You have to be a shelter to perform this operation');
        });
        it('Should not be able to retrieve all shelter matches if the user is not himself', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/matches`)
            .set('Authorization', 'Bearer ' + shelterToken2);

          expect(response.status).toEqual(constants.statusCodes.unAuthorized);
          expect(response.body.message).toEqual('You can only perform this operation for yourself');
        });
        it('Should not be able to retrieve all shelter matches if the shelter is not found', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${notFoundId}/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.notFound);
          expect(response.body.message).toEqual(`Shelter with id ${notFoundId} not found.`);
        });
        it('Should not be able to retrieve all shelter matches if the shelter id is not valid', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}1/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.badRequest);
          expect(response.body.message[0]).toEqual('"id" must be a valid GUID');
        });
      });

      describe('Valid', () => {
        it('Should retrieve all the shelter matches if the user logged in is the same shelter', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/matches`)
            .set('Authorization', 'Bearer ' + shelterToken);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual('Matches retrieved successfully!');
          expect(Array.isArray(response.body.data)).toBeTruthy();
        });
        it('Should retrieve all the shelter matches if the user logged in is an admin', async () => {
          const response = await request(server)
            .get(`/api/v1/shelter/${shelterId}/matches`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

          expect(response.status).toEqual(constants.statusCodes.ok);
          expect(response.body.message).toEqual('Matches retrieved successfully!');
          expect(Array.isArray(response.body.data)).toBeTruthy();
        });
      });
    });
  });
});

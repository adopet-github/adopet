import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import imageMocks from '../mocks/image.mocks';
import constants from '../../utils/constants';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;

const model = 'Image';
describe('Images', () => {
  const notFoundId = '082b8cd4-e8f4-4451-9430-2d3fc7182c37';
  afterAll(async () => {
    server.close();
  });

  describe('Adopter', () => {
    let adopter1Id = '';
    let adopter1Token = '';
    let adopter2Id = '';

    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(imageMocks.validAdopterLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      adopter1Id = loginResponse.body.data;
      adopter1Token = loginResponse.body.token;

      const loginResponse2 = await request(server)
        .post('/api/v1/auth/login')
        .send(imageMocks.validAdopterLogin2);

      expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse2.body).toHaveProperty('token');
      adopter2Id = loginResponse2.body.data;
    });

    describe('Invalid', () => {
      it(`Should not be able to upload ${model.toLowerCase()}s if not authenticated`, async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopter1Id}/${model.toLowerCase()}s`)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if not for himself`, async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopter2Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + adopter1Token)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('You can only perform this operation for yourself');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if is a shelter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(imageMocks.validShelterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');
        const shelterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/adopter/${adopter2Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('You have to be a adopter to perform this operation');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if the ${model.toLowerCase}s are not valid`, async () => {
        const response1 = await request(server)
          .put(`/api/v1/adopter/${adopter1Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + adopter1Token)
          .send(imageMocks.invalidCreateArray1);

        expect(response1.status).toEqual(constants.statusCodes.badRequest);
        expect(response1.body.message[0].toLowerCase()).toContain('caption');

        for (let i = 2; i <= 5; i++) {
          const response = await request(server)
            .put(`/api/v1/adopter/${adopter1Id}/${model.toLowerCase()}s`)
            .set('Authorization', 'Bearer ' + adopter1Token)
            .send(imageMocks[`invalidCreateArray${i}`] as object);

          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain('url');
        }
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if more than 4 ${model.toLowerCase()}s are passed`, async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${adopter1Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + adopter1Token)
          .send(imageMocks.validCreateArray5);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual(`"${model.toLowerCase()}s" must contain less than or equal to 4 items`);
      });

      it(`Should not be able to add ${model.toLowerCase()}s if adopter not found`, async () => {
        const response = await request(server)
          .put(`/api/v1/adopter/${notFoundId}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(imageMocks.validCreateArray3);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Adopter with id ${notFoundId} not found.`);
      });
    });

    describe('Valid', () => {
      let addedImages: ({id: string, caption: string, url: string})[] = [];
    
      afterEach(async () => {
        for (const image of addedImages) {
          const response = await request(server)
            .delete(`/api/v1/${model.toLowerCase()}/${image.id}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
    
          const {status, body} = response;
          
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(
            `${model} deleted succesfully!`
          );
        }

        addedImages = [];
      });

      for (let i = 1; i <= 4; i++) {
        it(`Should be able to add ${i} ${model.toLowerCase()}${i === 1 ? '' : 's'}`, async () => {
          const response = await request(server)
            .put(`/api/v1/adopter/${adopter1Id}/${model.toLowerCase()}s`)
            .set('Authorization', 'Bearer ' + adopter1Token)
            .send(imageMocks[`validCreateArray${i}`] as object);

          const { status, body } = response;

          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model}s added to adopter succesfully!`);
          expect(body).toHaveProperty('data');

          for (const image of body.data) addedImages.push({
            id: image.id as string,
            url: image.url as string,
            caption: image.caption as string
          });
        });
      }
    })
  });

  describe('Shelter', () => {
    let shelter1Id = '';
    let shelter1Token = '';
    let shelter2Id = '';

    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(imageMocks.validShelterLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      shelter1Id = loginResponse.body.data;
      shelter1Token = loginResponse.body.token;

      const loginResponse2 = await request(server)
        .post('/api/v1/auth/login')
        .send(imageMocks.validShelterLogin2);

      expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse2.body).toHaveProperty('token');
      shelter2Id = loginResponse2.body.data;
    });

    describe('Invalid', () => {
      it(`Should not be able to upload ${model.toLowerCase()}s if not authenticated`, async () => {
        const response = await request(server)
          .put(`/api/v1/shelter/${shelter1Id}/${model.toLowerCase()}s`)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if not for himself`, async () => {
        const response = await request(server)
          .put(`/api/v1/shelter/${shelter2Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelter1Token)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('You can only perform this operation for yourself');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if is an adopter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(imageMocks.validAdopterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');
        const adopterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/shelter/${shelter2Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + adopterToken)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('You have to be a shelter to perform this operation');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if the ${model.toLowerCase}s are not valid`, async () => {
        const response1 = await request(server)
          .put(`/api/v1/shelter/${shelter1Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelter1Token)
          .send(imageMocks.invalidCreateArray1);

        expect(response1.status).toEqual(constants.statusCodes.badRequest);
        expect(response1.body.message[0].toLowerCase()).toContain('caption');

        for (let i = 2; i <= 5; i++) {
          const response = await request(server)
            .put(`/api/v1/shelter/${shelter1Id}/${model.toLowerCase()}s`)
            .set('Authorization', 'Bearer ' + shelter1Token)
            .send(imageMocks[`invalidCreateArray${i}`] as object);

          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain('url');
        }
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if more than 4 ${model.toLowerCase()}s are passed`, async () => {
        const response = await request(server)
          .put(`/api/v1/shelter/${shelter1Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelter1Token)
          .send(imageMocks.validCreateArray5);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual(`"${model.toLowerCase()}s" must contain less than or equal to 4 items`);
      });
      it(`Should not be able to add ${model.toLowerCase()}s if shelter not found`, async () => {
        const response = await request(server)
          .put(`/api/v1/shelter/${notFoundId}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(imageMocks.validCreateArray3);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Shelter with id ${notFoundId} not found.`);
      });
    });

    describe('Valid', () => {
      let addedImages: ({id: string, caption: string, url: string})[] = [];
    
      afterEach(async () => {
        for (const image of addedImages) {
          const response = await request(server)
            .delete(`/api/v1/${model.toLowerCase()}/${image.id}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
    
          const {status, body} = response;
          
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(
            `${model} deleted succesfully!`
          );
        }

        addedImages = [];
      });

      for (let i = 1; i <= 4; i++) {
        it(`Should be able to add ${i} ${model.toLowerCase()}${i === 1 ? '' : 's'}`, async () => {
          const response = await request(server)
            .put(`/api/v1/shelter/${shelter1Id}/${model.toLowerCase()}s`)
            .set('Authorization', 'Bearer ' + shelter1Token)
            .send(imageMocks[`validCreateArray${i}`] as object);

          const { status, body } = response;

          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model}s added to shelter succesfully!`);
          expect(body).toHaveProperty('data');

          for (const image of body.data) addedImages.push({
            id: image.id as string,
            url: image.url as string,
            caption: image.caption as string
          });
        });
      }
    })
  });

  describe('Animal', () => {
    let shelter1Id = '';
    let shelter1Token = '';
    let shelter2Id = '';
    let shelter2Token = '';
    let animalId = '';

    beforeAll(async () => {
      const loginResponse = await request(server)
        .post('/api/v1/auth/login')
        .send(imageMocks.validShelterLogin);

      expect(loginResponse.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse.body).toHaveProperty('token');
      shelter1Id = loginResponse.body.data;
      shelter1Token = loginResponse.body.token;

      const createAnimalResponse = await request(server)
        .post('/api/v1/animal')
        .set('Authorization', 'Bearer ' + shelter1Token)
        .send({...imageMocks.validAnimal, shelterId: shelter1Id});

        expect(createAnimalResponse.status).toEqual(constants.statusCodes.created);
        expect(createAnimalResponse.body).toHaveProperty('data');
        animalId = createAnimalResponse.body.data.animal.id;

      const loginResponse2 = await request(server)
        .post('/api/v1/auth/login')
        .send(imageMocks.validShelterLogin2);

      expect(loginResponse2.status).toEqual(constants.statusCodes.ok);
      expect(loginResponse2.body).toHaveProperty('token');
      shelter2Id = loginResponse2.body.data;
      shelter2Token = loginResponse2.body.token;
    });

    afterAll(async () => {
      const deleteAnimalResponse = await request(server)
        .delete('/api/v1/animal/' + animalId)
        .set('Authorization', 'Bearer ' + shelter1Token)
        .send({...imageMocks.validAnimal, shelterId: shelter1Id});

      expect(deleteAnimalResponse.status).toEqual(constants.statusCodes.ok);
      expect(deleteAnimalResponse.body.message).toEqual('Animal deleted succesfully!');
    })

    describe('Invalid', () => {
      it(`Should not be able to upload ${model.toLowerCase()}s if not authenticated`, async () => {
        const response = await request(server)
          .put(`/api/v1/animal/${animalId}/${model.toLowerCase()}s`)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('Unauthorized');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if the user is not his shelter`, async () => {
        const response = await request(server)
          .put(`/api/v1/animal/${animalId}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelter2Token)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('You can only perform this operation for your own shelter animals');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if is an adopter`, async () => {
        const loginResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(imageMocks.validAdopterLogin);

        expect(loginResponse.status).toEqual(constants.statusCodes.ok);
        expect(loginResponse.body).toHaveProperty('token');
        const adopterToken = loginResponse.body.token;

        const response = await request(server)
          .put(`/api/v1/shelter/${shelter2Id}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + adopterToken)
          .send(imageMocks.validCreateArray1);

        const {status, body} = response;
        expect(status).toEqual(constants.statusCodes.unAuthorized);
        expect(body.message).toEqual('You have to be a shelter to perform this operation');
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if the ${model.toLowerCase}s are not valid`, async () => {
        const response1 = await request(server)
          .put(`/api/v1/animal/${animalId}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelter1Token)
          .send(imageMocks.invalidCreateArray1);

        expect(response1.status).toEqual(constants.statusCodes.badRequest);
        expect(response1.body.message[0].toLowerCase()).toContain('caption');

        for (let i = 2; i <= 5; i++) {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/${model.toLowerCase()}s`)
            .set('Authorization', 'Bearer ' + shelter1Token)
            .send(imageMocks[`invalidCreateArray${i}`] as object);

          const { status, body } = response;
          expect(status).toEqual(constants.statusCodes.badRequest);
          expect(body.message[0].toLowerCase()).toContain('url');
        }
      });
      it(`Should not be able to upload ${model.toLowerCase()}s if more than 4 ${model.toLowerCase()}s are passed`, async () => {
        const response = await request(server)
          .put(`/api/v1/animal/${animalId}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + shelter1Token)
          .send(imageMocks.validCreateArray5);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual(`"${model.toLowerCase()}s" must contain less than or equal to 4 items`);
      });

      it(`Should not be able to add ${model.toLowerCase()}s if animal not found`, async () => {
        const response = await request(server)
          .put(`/api/v1/animal/${notFoundId}/${model.toLowerCase()}s`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(imageMocks.validCreateArray3);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Animal with id ${notFoundId} not found.`);
      });
    });

    describe('Valid', () => {
      let addedImages: ({id: string, caption: string, url: string})[] = [];
    
      afterEach(async () => {
        for (const image of addedImages) {
          const response = await request(server)
            .delete(`/api/v1/${model.toLowerCase()}/${image.id}`)
            .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
    
          const {status, body} = response;
          
          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(
            `${model} deleted succesfully!`
          );
        }

        addedImages = [];
      });

      for (let i = 1; i <= 4; i++) {
        it(`Should be able to add ${i} ${model.toLowerCase()}${i === 1 ? '' : 's'}`, async () => {
          const response = await request(server)
            .put(`/api/v1/animal/${animalId}/${model.toLowerCase()}s`)
            .set('Authorization', 'Bearer ' + shelter1Token)
            .send(imageMocks[`validCreateArray${i}`] as object);

          const { status, body } = response;

          expect(status).toEqual(constants.statusCodes.ok);
          expect(body.message).toEqual(`${model}s added to animal succesfully!`);
          expect(body).toHaveProperty('data');

          for (const image of body.data) addedImages.push({
            id: image.id as string,
            url: image.url as string,
            caption: image.caption as string
          });
        });
      }
    })
  });

  describe('Retrieve all', () => {
    it('Should retrieve all the images if admin', async () => {
      const response = await request(server)
        .get(`/api/v1/${model.toLowerCase()}`)
        .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      const { status, body } = response;
      expect(status).toEqual(constants.statusCodes.ok);
      expect(body.message).toEqual(`${model}s retrieved successfully!`);
    });
  });

  describe('Delete', () => {
    describe('Invalid', () => {
      it(`Should not delete a non existing ${model.toLowerCase()}`, async () => {
        const response = await request(server)
          .delete(`/api/v1/${model.toLowerCase()}/${notFoundId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        const { status, body } = response;
        expect(status).toEqual(constants.statusCodes.notFound);
        expect(body.message).toEqual(`${model} with id ${notFoundId} not found.`);
      });
    });
  });
});
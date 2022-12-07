import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import adopterMocks from '../mocks/adopter.mocks';
import constants from '../../utils/constants';
import animalMocks from '../mocks/animal.mocks';
import shelterMocks from '../mocks/shelter.mocks';
import messageMocks from '../mocks/message.mocks';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;

describe('Messages', () => {
  const notFoundId = '082b8cd4-e8f4-4451-9430-2d3fc7182c37';
  let adopterId = '';
  let adopterToken = '';
  let adopterId2 = '';
  let adopterToken2 = '';
  let shelterId = '';
  let shelterToken = '';
  let shelterToken2 = '';
  let animalId = '';

  beforeAll(async () => {
    const createAdopterResponse = await request(server)
      .post('/api/v1/adopter')
      .send(adopterMocks.validCreateObject);

    expect(createAdopterResponse.status).toEqual(constants.statusCodes.created);
    adopterId = createAdopterResponse.body.data;
    adopterToken = createAdopterResponse.body.token;

    const createShelterResponse = await request(server)
      .post('/api/v1/shelter')
      .send(shelterMocks.validCreateObject);

    expect(createShelterResponse.status).toEqual(constants.statusCodes.created);
    shelterId = createShelterResponse.body.data;
    shelterToken = createShelterResponse.body.token;

    const createAnimalResponse = await request(server)
      .post('/api/v1/animal')
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
      .send({...animalMocks.validCreateObject, shelterId});

    expect(createAnimalResponse.status).toEqual(constants.statusCodes.created);
    animalId = createAnimalResponse.body.data.animal.id;
    

    const adopterLoginResponse = await request(server)
      .post('/api/v1/auth/login')
      .send(adopterMocks.validLogin);
    expect(adopterLoginResponse.status).toEqual(constants.statusCodes.ok);

    adopterId2 = adopterLoginResponse.body.data;
    adopterToken2 = adopterLoginResponse.body.token;

    const shelterLoginResponse = await request(server)
      .post('/api/v1/auth/login')
      .send(shelterMocks.validLogin);
    expect(shelterLoginResponse.status).toEqual(constants.statusCodes.ok);

    shelterToken2 = shelterLoginResponse.body.token;

    const likeResponse = await request(server)
      .put(`/api/v1/adopter/${adopterId}/like/${animalId}`)
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
      expect(likeResponse.status).toEqual(constants.statusCodes.ok);
      
    const matchResponse = await request(server)
      .put(`/api/v1/animal/${animalId}/match/${adopterId}`)
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN);
    expect(matchResponse.status).toEqual(constants.statusCodes.ok);
  });

  afterAll(async () => {
    const deleteMatchMessages = await request(server)
      .delete(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

    expect(deleteMatchMessages.status).toEqual(constants.statusCodes.ok);

    const deleteAdopterReponse = await request(server)
      .delete('/api/v1/adopter/' + adopterId)
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

    expect(deleteAdopterReponse.status).toEqual(constants.statusCodes.ok);

    const deleteShelterReponse = await request(server)
      .delete('/api/v1/shelter/' + shelterId)
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

    expect(deleteShelterReponse.status).toEqual(constants.statusCodes.ok);

    server.close();

  });
  describe('Retrieve by match', () => {
    describe('Invalid', () => {
      it('Should not retrieve messages if not logged in', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body.message).toEqual('Unauthorized');
      });
      it('Should not retrieve messages if the adopter logged in is not an interlocutor', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken2);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body.message).toEqual('You should be in the chat to send or get chat messages');
      });
      it('Should not retrieve messages if the shelter logged in is not an interlocutor', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken2);

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body.message).toEqual('You should be in the chat to send or get chat messages');
      });
      it('Should not retrieve messages if the adopter is not found', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${notFoundId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Adopter with id ${notFoundId} not found.`);
      });
      it('Should not retrieve messages if the animal is not found', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${notFoundId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Animal with id ${notFoundId} not found.`);
      });
      it('Should not retrieve messages if the adopter id is not valid', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}1/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual('"adopterId" must be a valid GUID');
      });
      it('Should not retrieve messages if the animal id is not valid', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}1`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual('"animalId" must be a valid GUID');
      });

      it('Should not retrieve all messages if the adopter and animal are not matched', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId2}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken2);

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`The adopter with id ${adopterId2} is not matched with animal with id ${animalId}`);
      });
    });
    
    describe('Valid', () => {
      it('Should retrieve the messages if the adopter in the conversation tries to retrieve them', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body.message).toEqual('Messages retrieved successfully!');
      });
      it('Should retrieve the messages if the animal owner shelter in the conversation tries to retrieve them', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body.message).toEqual('Messages retrieved successfully!');
      });
      it('Should retrieve the messages if the admin tries to retrieve them', async () => {
        const response = await request(server)
          .get(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

        expect(response.status).toEqual(constants.statusCodes.ok);
        expect(response.body.message).toEqual('Messages retrieved successfully!');
      });
    });
  });
  
  describe('Create', () => {
    describe('Invalid', () => {
      it('Should not create messages if not logged in', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body.message).toEqual('Unauthorized');
      });
      it('Should not create messages if the adopter logged in is not an interlocutor', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken2)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body.message).toEqual('You should be in the chat to send or get chat messages');
      });
      it('Should not create messages if the shelter logged in is not an interlocutor', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken2)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.unAuthorized);
        expect(response.body.message).toEqual('You should be in the chat to send or get chat messages');
      });
      it('Should not create messages if the adopter is not found', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${notFoundId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Adopter with id ${notFoundId} not found.`);
      });
      it('Should not create messages if the animal is not found', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${notFoundId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`Animal with id ${notFoundId} not found.`);
      });
      it('Should not create messages if the adopter id is not valid', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}1/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual('"adopterId" must be a valid GUID');
      });
      it('Should not create messages if the animal id is not valid', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}1`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message[0]).toEqual('"animalId" must be a valid GUID');
      });
      it('Should not create messages if the message lacks of the ids', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}1`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send(messageMocks.validMessage);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
      });
      it('Should not create messages if the message format is not valid', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}1`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({...messageMocks.invalidMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.badRequest);
      });
      it('Should not create messages if the adopter and animal are not matched', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId2}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken2)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.notFound);
        expect(response.body.message).toEqual(`The adopter with id ${adopterId2} is not matched with animal with id ${animalId}`);
      });
    });
    
    describe('Valid', () => {
      it('Should create the messages if the adopter in the conversation tries to create them', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + adopterToken)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.created);
        expect(response.body.message).toEqual('Message created successfully!');
      });
      it('Should create the messages if the animal owner shelter in the conversation tries to create them', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + shelterToken)
          .send({...messageMocks.validMessage, author: 'shelter'});

        expect(response.status).toEqual(constants.statusCodes.created);
        expect(response.body.message).toEqual('Message created successfully!');
      });
      it('Should create the messages if the admin tries to create them', async () => {
        const response = await request(server)
          .post(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`)
          .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
          .send({...messageMocks.validMessage, author: 'adopter'});

        expect(response.status).toEqual(constants.statusCodes.created);
        expect(response.body.message).toEqual('Message created successfully!');
      });
    });
  });

  describe('Delete by match', () => {
    it('Should not delete messages if not logged in', async () => {
      const response = await request(server)
        .delete(`/api/v1/message/adopter/${adopterId}/animal/${animalId}`);

      expect(response.status).toEqual(constants.statusCodes.unAuthorized);
      expect(response.body.message).toEqual('Unauthorized');
    });
    it('Should not delete messages if the adopter is not found', async () => {
      const response = await request(server)
        .delete(`/api/v1/message/adopter/${notFoundId}/animal/${animalId}`)
        .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      expect(response.status).toEqual(constants.statusCodes.notFound);
      expect(response.body.message).toEqual(`Adopter with id ${notFoundId} not found.`);
    });
    it('Should not delete messages if the animal is not found', async () => {
      const response = await request(server)
        .delete(`/api/v1/message/adopter/${adopterId}/animal/${notFoundId}`)
        .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      expect(response.status).toEqual(constants.statusCodes.notFound);
      expect(response.body.message).toEqual(`Animal with id ${notFoundId} not found.`);
    });
    it('Should not delete messages if the adopter id is not valid', async () => {
      const response = await request(server)
        .delete(`/api/v1/message/adopter/${adopterId}1/animal/${animalId}`)
        .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      expect(response.status).toEqual(constants.statusCodes.badRequest);
      expect(response.body.message[0]).toEqual('"adopterId" must be a valid GUID');
    });
    it('Should not delete messages if the animal id is not valid', async () => {
      const response = await request(server)
        .delete(`/api/v1/message/adopter/${adopterId}/animal/${animalId}1`)
        .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      expect(response.status).toEqual(constants.statusCodes.badRequest);
      expect(response.body.message[0]).toEqual('"animalId" must be a valid GUID');
    });

    it('Should not delete all messages if the adopter and animal are not matched', async () => {
      const response = await request(server)
        .delete(`/api/v1/message/adopter/${adopterId2}/animal/${animalId}`)
        .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      expect(response.status).toEqual(constants.statusCodes.notFound);
      expect(response.body.message).toEqual(`The adopter with id ${adopterId2} is not matched with animal with id ${animalId}`);
    });
  })
});
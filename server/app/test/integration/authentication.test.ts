import request from 'supertest';
import dotenv from 'dotenv';
import { server } from '../../app';
dotenv.config();
import adopterMocks from '../mocks/adopter.mocks';
import constants from '../../utils/constants';
import shelterMocks from '../mocks/shelter.mocks';
import authenticationMocks from '../mocks/authentication.mocks';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN as string;
const GOOGLE_TOKEN = process.env.GOOGLE_TOKEN as string;
const GOOGLE_ID = process.env.TEST_GOOGLE_ID as string;
const NON_EXISTING_USER_GOOGLE_TOKEN = process.env.GOOGLE_TOKEN_NON_EXISTING as string;

describe('Authentication', () => {
  let googleAdopterToken = '';
  let googleAdopterId = '';
  let shelterToken = '';

  beforeAll(async () => {
    const nonGoogleAdopterResponse = await request(server)
      .post('/api/v1/auth/login')
      .send(adopterMocks.validLogin);

    expect(nonGoogleAdopterResponse.status).toEqual(constants.statusCodes.ok);

    const validCreateClone = {...adopterMocks.validCreateObject, google_id: GOOGLE_ID} as unknown as {google_id: string, password?: string};
    delete validCreateClone.password;
    const googleAdopterResponse = await request(server)
      .post('/api/v1/adopter')
      .send(validCreateClone);

    expect(googleAdopterResponse.status).toEqual(constants.statusCodes.created);
    googleAdopterToken = googleAdopterResponse.body.token;
    googleAdopterId = googleAdopterResponse.body.data;

    const shelterResponse = await request(server)
      .post('/api/v1/auth/login')
      .send(shelterMocks.validLogin);

    expect(shelterResponse.status).toEqual(constants.statusCodes.ok);
    shelterToken = shelterResponse.body.token;
  });

  afterAll(async () => {
    const response = await request(server)
      .delete('/api/v1/adopter/' + googleAdopterId)
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN);

      expect(response.status).toEqual(constants.statusCodes.ok);

    server.close();
  });

  describe('Login', () => {
    describe('Invalid', () => {
      it('Should not show that the user that is trying to log in was not found in the database', async () => {
        const response = await request(server)
          .post('/api/v1/auth/login')
          .send(authenticationMocks.nonExistingUserLogin);

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message).toEqual(authenticationMocks.nonValidMessage);
      });
      it('Should check if an existing adopter password is not correct', async () => {
        const response = await request(server)
          .post('/api/v1/auth/login')
          .send({...adopterMocks.validLogin, password: 'NonValidPassword12'});

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message).toEqual(authenticationMocks.nonValidMessage); 
      });
      it('Should check if an existing shelter password is not correct', async () => {
        const response = await request(server)
          .post('/api/v1/auth/login')
          .send({...shelterMocks.validLogin, password: 'NonValidPassword12'});

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message).toEqual(authenticationMocks.nonValidMessage); 
      });
      it('Should not let an existing google user to log in with password', async () => {
        const response = await request(server)
          .post('/api/v1/auth/login')
          .send({email: adopterMocks.validCreateObject.email, password: 'NonValidPassword12'});

        expect(response.status).toEqual(constants.statusCodes.badRequest);
        expect(response.body.message).toEqual('Google account detected, log in with Google instead'); 
      });
    });
    
    describe('Valid', () => {
      it('Should log in a shelter correctly when the email and the password are correct', async () => {
        const shelterResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(shelterMocks.validLogin);
  
        expect(shelterResponse.status).toEqual(constants.statusCodes.ok);
        expect(shelterResponse.body.message).toEqual('Shelter logged in successfully!');
        expect(shelterResponse.body.token).toBeDefined();
      });
      it('Should log in a adopter correctly when the email and the password are correct', async () => {
        const adopterResponse = await request(server)
          .post('/api/v1/auth/login')
          .send(adopterMocks.validLogin);
  
        expect(adopterResponse.status).toEqual(constants.statusCodes.ok);
        expect(adopterResponse.body.message).toEqual('Adopter logged in successfully!');
        expect(adopterResponse.body.token).toBeDefined();
      });
    });
  });
  describe('Google', () => {
    describe('Invalid', () => {
      it('Should not log in with Google when an invalid Google token is passed', async () => {
        const googleResponse = await request(server)
          .post('/api/v1/auth/google')
          .send({token: GOOGLE_TOKEN + '1'});

        expect(googleResponse.status).toEqual(constants.statusCodes.unAuthorized);
        expect(googleResponse.body.message).toEqual('Google token not valid or not provided');
      });
      it('Should not log in with Google when an no Google token is passed', async () => {
        const googleResponse = await request(server)
          .post('/api/v1/auth/google');

        expect(googleResponse.status).toEqual(constants.statusCodes.unAuthorized);
        expect(googleResponse.body.message).toEqual('Google token not valid or not provided');
      });
    });

    describe('Valid', () => {
      it('Should return the google user details when a user with that email is not found', async () => {
        const googleResponse = await request(server)
          .post('/api/v1/auth/google')
          .send({token: NON_EXISTING_USER_GOOGLE_TOKEN});

        expect(googleResponse.status).toEqual(constants.statusCodes.ok);
        expect(googleResponse.body.message).toEqual('User registered with google');
        const { email, first_name, last_name, google_id } = googleResponse.body.data;
        expect(email).toBeDefined();
        expect(first_name).toBeDefined();
        expect(last_name).toBeDefined();
        expect(google_id).toBeDefined();
      });
      it('Should log in a google user if it exists', async () => {
        const googleResponse = await request(server)
          .post('/api/v1/auth/google')
          .send({token: GOOGLE_TOKEN});

        expect(googleResponse.status).toEqual(constants.statusCodes.ok);
        expect(googleResponse.body.message).toEqual('User logged in successfully with google');
        expect(googleResponse.body).toHaveProperty('token');
      });
    });
  });

  describe('Profile', () => {
    describe('Invalid', () => {
      it('Should not be able to retrieve his profile if not logged in', async () => {
        const profile = await request(server)
          .get('/api/v1/auth/profile')
          .set('Authorization', 'Bearer ');

        expect(profile.status).toEqual(constants.statusCodes.unAuthorized);
        expect(profile.body.message).toEqual('Unauthorized');
      });
      it('Should not be able to retrieve his adopter profile if the token is not valid', async () => {
        const profile = await request(server)
          .get('/api/v1/auth/profile')
          .set('Authorization', `Bearer 1${googleAdopterToken}`);

        expect(profile.status).toEqual(constants.statusCodes.unAuthorized);
        expect(profile.body.message).toEqual('Unauthorized');
      });
      it('Should not be able to retrieve his shelter profile if the token is not valid', async () => {
        const profile = await request(server)
          .get('/api/v1/auth/profile')
          .set('Authorization', `Bearer 1${shelterToken}`);

        expect(profile.status).toEqual(constants.statusCodes.unAuthorized);
        expect(profile.body.message).toEqual('Unauthorized');
      });
      it('Should not be able to retrieve his profile if an admin', async () => {
        const profile = await request(server)
          .get('/api/v1/auth/profile')
          .set('Authorization', `Bearer ${ADMIN_TOKEN}`);

        expect(profile.status).toEqual(418);
        expect(profile.body.message).toEqual('Why are you trying to retrieve your profile admin? lol 🤓');
      });
    });
    describe('Valid', () => {
      it('Should be able to retrieve his adopter profile if logged in', async () => {
        const profile = await request(server)
          .get('/api/v1/auth/profile')
          .set('Authorization', `Bearer ${googleAdopterToken}`);

        expect(profile.status).toEqual(constants.statusCodes.ok);
        expect(profile.body.message).toEqual('Profile retrieved successfully!');
        expect(profile.body.data).toHaveProperty('first_name');
        expect(profile.body.data).toHaveProperty('last_name');
      });
      it('Should be able to retrieve his shelter profile if logged in', async () => {
        const profile = await request(server)
          .get('/api/v1/auth/profile')
          .set('Authorization', `Bearer ${shelterToken}`);

        expect(profile.status).toEqual(constants.statusCodes.ok);
        expect(profile.body.message).toEqual('Profile retrieved successfully!');
        expect(profile.body.data).toHaveProperty('name');
      });
    });
  });

  describe('Logout', () => {
    describe('Invalid', () => {
      it('Should not be able to log out if not logged in', async () => {
        const logout = await request(server)
          .post('/api/v1/auth/logout');

        expect(logout.status).toEqual(constants.statusCodes.unAuthorized);
        expect(logout.body.message).toEqual('Unauthorized');
      })
      it('Should not be able to log out an adopter with an invalid token', async () => {
        const logout = await request(server)
          .post('/api/v1/auth/logout')
          .set('Authorization', `Bearer 1${googleAdopterToken}`);

        expect(logout.status).toEqual(constants.statusCodes.unAuthorized);
        expect(logout.body.message).toEqual('Unauthorized');
      });
      it('Should not be able to log out a shelter with an invalid token', async () => {
        const logout = await request(server)
          .post('/api/v1/auth/logout')
          .set('Authorization', `Bearer 1${shelterToken}`);

        expect(logout.status).toEqual(constants.statusCodes.unAuthorized);
        expect(logout.body.message).toEqual('Unauthorized');
      });
    });
    describe('Valid', () => {
      it('Should disable the token for future operations for a shelter', async () => {
        const logout = await request(server)
          .post('/api/v1/auth/logout')
          .set('Authorization', `Bearer ${shelterToken}`);

        expect(logout.status).toEqual(constants.statusCodes.ok);
        expect(logout.body.message).toEqual('User logged out successfully!');

        const logout2 = await request(server)
          .post('/api/v1/auth/logout')
          .set('Authorization', `Bearer ${shelterToken}`);

        expect(logout2.status).toEqual(constants.statusCodes.unAuthorized);
        expect(logout2.body.message).toEqual('Unauthorized');
      });
      it('Should disable the token for future operations for an adopter', async () => {
        const logout = await request(server)
          .post('/api/v1/auth/logout')
          .set('Authorization', `Bearer ${googleAdopterToken}`);

        expect(logout.status).toEqual(constants.statusCodes.ok);
        expect(logout.body.message).toEqual('User logged out successfully!');

        const logout2 = await request(server)
          .post('/api/v1/auth/logout')
          .set('Authorization', `Bearer ${googleAdopterToken}`);

        expect(logout2.status).toEqual(constants.statusCodes.unAuthorized);
        expect(logout2.body.message).toEqual('Unauthorized');
      });
    });
  });
  
  describe('Verify', () => {
    describe('Invalid', () => {
      it('Should throw an error if the user already exists', async () => {
        const verify = await request(server)
          .post('/api/v1/auth/verify')
          .send(authenticationMocks.verifyIncorrectObject);

        expect(verify.status).toEqual(constants.statusCodes.badRequest);
        expect(verify.body.message).toEqual(`User with email ${authenticationMocks.verifyIncorrectObject.email} already exists!`);
      });
    });
    describe('Valid', () => {
      it('Should give you an approval if the fields are correct', async () => {
        const verify = await request(server)
          .post('/api/v1/auth/verify')
          .send(authenticationMocks.verifyCorrectObject);

        expect(verify.status).toEqual(constants.statusCodes.ok);
        expect(verify.body.message).toEqual('The fields provided are correct');
      });
    });
  });
});
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client();

export default async function getUserInfoFromToken(token: string | undefined) {
  if (token === undefined) return null;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload() as {sub: string, email: string, given_name: string, family_name: string};
    return {
      google_id: payload.sub,
      email: payload.email,
      first_name: payload.given_name,
      last_name: payload.family_name
    }
  } catch (err) {
    console.warn('ERROR AT GOOGLE-getTokenFromCode: ', err);
    return null;
  }
}
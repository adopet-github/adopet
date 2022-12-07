import dotenv from 'dotenv';
dotenv.config();

const constants = {
  statusCodes: {
    ok: 200,
    created: 201,
    badRequest: 400,
    unAuthorized: 401,
    notFound: 404,
    serverError: 500
  },
  fallbackResponse: {
    status: 500,
    message: 'Internal server error'
  },
  cookieSettings: {
    httpOnly: true,
    sameSite: 'strict' as 'strict' | 'lax',
    secure: process.env.ENVIRONMENT === 'production',
    maxAge: 15 * 60 * 1000
  }
};

export default constants;

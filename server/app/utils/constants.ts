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
  }
};

export default constants;

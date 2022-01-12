const expressJwt = require('express-jwt');

function authJWT() {
  const secret = process.env.userTokenSecretKey;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      /*       { url: /\/api\/v1\/courses(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`, */
      { url: /{.*}/ },
    ],
  });
}

const isRevoked = (req, payload, done) => {
  if (!payload.isAdmin) done(null, true);

  done();
};

module.exports = authJWT;

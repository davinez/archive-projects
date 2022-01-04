const authJwt = require('../middleware/auth.Jwt');
const userController = require('../controllers/user.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/test/all', userController.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], userController.userBoard);

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};

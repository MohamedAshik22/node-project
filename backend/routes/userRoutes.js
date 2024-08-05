const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/userController');
const middleware = require ('../middlewares/middleware');

router.post('/users', middleware.verifyToken, userController.createUser);

router.get('/users', middleware.verifyToken, userController.getUsers);

router.get('/users/:id', middleware.verifyToken, userController.getUserById);

router.put('/users/:id', middleware.verifyToken, userController.updateUser);

router.delete('/users/:id', middleware.verifyToken, userController.deleteUser);

router.post('/login', userController.login); 

module.exports= router;
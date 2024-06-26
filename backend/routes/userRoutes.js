const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/userController');

router.post('/users', userController.createUser);

router.get('/users', userController.getUsers);

router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

router.post('/login', userController.login); 

router.get('/verifyToken', userController.verifyToken, (req, res) => {
    res.status(200).json({ status: true, message: 'Token verified' });
});

module.exports= router;
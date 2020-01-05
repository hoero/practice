const express = require('express');

const { specific } = require('../common/data');
const userController = require('../controllers/userController');

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route(specific)
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;

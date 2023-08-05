const { getAll, create, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const imageRouter = express.Router();

imageRouter.route('/')
    .get( verifyJWT, getAll)
    .post(upload.single('image'), verifyJWT , create);

imageRouter.route('/:id')
    .put(verifyJWT, update)// remover
	.delete(verifyJWT, remove)

module.exports = imageRouter;
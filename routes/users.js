const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  userController.crearUsuario
);

module.exports = router;

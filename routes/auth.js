const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/',
  [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  authController.autenticarUsuario
);

module.exports = router;

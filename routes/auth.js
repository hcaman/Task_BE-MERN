const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middelware/auth');

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
router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;

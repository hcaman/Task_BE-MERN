const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middelware/auth');

router.post(
  '/',
  auth,
  [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
  proyectoController.crearProyecto
);
router.get('/', auth, proyectoController.showProyecto);

module.exports = router;

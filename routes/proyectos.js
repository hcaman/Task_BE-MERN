const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middelware/auth');

router.post(
  '/',
  auth,
  [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
  proyectoController.addProyecto
);
router.get('/', auth, proyectoController.showProyecto);
router.put(
  '/:id',
  auth,
  [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
  proyectoController.updateProyecto
);
router.delete('/:id', auth, proyectoController.deleteProyecto);

module.exports = router;

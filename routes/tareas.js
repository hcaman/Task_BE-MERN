const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middelware/auth');

router.post(
  '/',
  auth,
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
  ],
  tareaController.addTarea
);

router.get('/', auth, tareaController.showTarea);

module.exports = router;

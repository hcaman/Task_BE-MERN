const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.post('/', proyectoController.crearProyecto);

module.exports = router;

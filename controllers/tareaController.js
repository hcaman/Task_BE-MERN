const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.addTarea = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ Errors: errores.array() });
  }

  const { proyecto } = req.body;
  try {
    const isProyecto = await Proyecto.findById(proyecto);

    if (!isProyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (isProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const tarea = new Tarea(req.body);
    tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log('Error:' + error);
    res.status(500).send('Hubo un error');
  }
};

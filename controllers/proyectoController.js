const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ Errors: errores.array() });
  }

  try {
    const proyecto = new Proyecto(req.body);

    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto);

    // res.json({ msg: 'Proyecto creado correctamente' });
  } catch (error) {
    console.log('Error:' + error);
    res.status(500).send('Hubo un error');
  }
};

const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.addProyecto = async (req, res) => {
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

exports.showProyecto = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });

    res.json({ proyectos });
  } catch (error) {
    console.log('Error:' + error);
    res.status(500).send('Hubo un error');
  }
};

exports.updateProyecto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ Errors: errores.array() });
  }

  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log('Error:' + error);
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteProyecto = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Proyecto eliminado' });
  } catch (error) {
    console.log('Error:' + error);
    res.status(500).send('Error en el servidor');
  }
};

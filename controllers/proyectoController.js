const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);

    proyecto.save();
    res.json(proyecto);

    // res.json({ msg: 'Proyecto creado correctamente' });
  } catch (error) {
    console.log('Error:' + error);
    res.status(500).send('Hubo un error');
  }
};

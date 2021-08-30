const Usuario = require('../models/Usuario');
exports.crearUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    usuario = new Usuario(req.body);

    await usuario.save();

    res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log('Error:' + error);
    res.status(400).send('Hubo un error');
  }
};

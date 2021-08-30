const Usuario = require('../models/Usuario');
exports.crearUsuario = async (req, res) => {
  // console.log(req.body);
  try {
    let usuario;
    usuario = new Usuario(req.body);
    console.log(usuario);
    await usuario.save();
    res.send('Usuario creado correctamente');
  } catch (error) {
    console.log('Error:' + error);
    res.status(400).send('Hubo un error');
  }
};

const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ Errors: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({ msg: 'Password incorrect' });
    }

    const payload = { usuario: { id: usuario.id } };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );

    // res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log('Error:' + error);
    res.status(400).send('Hubo un error');
  }
};

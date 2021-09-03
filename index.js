const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.PORT || 4000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

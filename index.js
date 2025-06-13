require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // <-- AGREGÁ ESTO

const chatRoutes = require('./routes/chat');

const app = express();
app.use(cors());
app.use(express.json());

// Usá morgan (formato 'dev' es el clásico para desarrollo)
app.use(morgan('dev')); // <-- AGREGÁ ESTO

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});

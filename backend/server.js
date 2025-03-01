const express = require('express');
const cors = require('cors');
const partidasRoutes = require('./partidasRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/partidas', partidasRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
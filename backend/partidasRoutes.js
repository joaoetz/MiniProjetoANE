const express = require('express');
const router = express.Router();
const { getPartidas, addPartida, removerPartida, adicionarJogador, confirmarPresenca } = require('./partidasController');

router.get('/', getPartidas);
router.post('/', addPartida);
router.delete('/:id', removerPartida);
router.post('/:id/jogador', adicionarJogador);
router.patch('/:id/presenca', confirmarPresenca);

module.exports = router;
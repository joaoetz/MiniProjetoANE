const { lerDados, salvarDados } = require('./db');

const getPartidas = (req, res) => res.json(lerDados());

const addPartida = (req, res) => {
    const partidas = lerDados();
    const novaPartida = { id: Date.now(), ...req.body, jogadores: [] };
    partidas.push(novaPartida);
    salvarDados(partidas);
    res.json(novaPartida);
};

const removerPartida = (req, res) => {
    const partidas = lerDados().filter(p => p.id != req.params.id);
    salvarDados(partidas);
    res.json({ message: "Partida removida" });
};

const adicionarJogador = (req, res) => {
    const partidas = lerDados();
    const partida = partidas.find(p => p.id == req.params.id);
    if (!partida) return res.status(404).json({ message: "Partida não encontrada" });

    partida.jogadores.push({ nome: req.body.nome, telefone: req.body.telefone, presente: false });
    salvarDados(partidas);
    res.json(partida);
};

const confirmarPresenca = (req, res) => {
    const partidas = lerDados();
    const partida = partidas.find(p => p.id == req.params.id);
    if (!partida) return res.status(404).json({ message: "Partida não encontrada" });

    const jogador = partida.jogadores.find(j => j.nome == req.body.nome);
    if (!jogador) return res.status(404).json({ message: "Jogador não encontrado" });

    jogador.presente = true;
    salvarDados(partidas);
    res.json(partida);
};

module.exports = { getPartidas, addPartida, removerPartida, adicionarJogador, confirmarPresenca };

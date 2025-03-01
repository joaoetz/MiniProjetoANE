const API_URL = 'http://localhost:3000/partidas';
const $ = (id) => document.getElementById(id);

// Carregar partidas na tela
const carregarPartidas = async () => {
    const res = await fetch(API_URL);
    const partidas = await res.json();

    $('partida-list').innerHTML = partidas.map(p => `
        <li>
            <strong>${p.titulo}</strong> - ${p.local} - ${new Date(p.data).toLocaleString('pt-BR')}
            <button onclick="removerPartida(${p.id})">Excluir</button>
            <button onclick="adicionarJogador(${p.id})">Adicionar Jogador</button>

            <h3>Jogadores</h3>
            <ul>
                ${p.jogadores && p.jogadores.length > 0 ? p.jogadores.map(j => `
                    <li>
                        ${j.nome} - ${j.telefone} - ${j.presente ? 'Confirmado' : 'Pendente'}
                        <button onclick="confirmarPresenca(${p.id}, '${j.nome}')">Confirmar Presença</button>
                    </li>
                `).join('') : '<li>Nenhum jogador adicionado ainda.</li>'}
            </ul>
        </li>
    `).join('');
};

// Criar nova partida
const adicionarPartida = async () => {
    const titulo = $('titulo').value.trim();
    const local = $('local').value.trim();
    const data = $('data').value;

    if (!titulo || !local || !data) return alert("Preencha todos os campos!");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, local, data })
    });

    $('titulo').value = '';
    $('local').value = '';
    $('data').value = '';
    carregarPartidas();
};

// Remover partida
const removerPartida = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarPartidas();
};

// Adicionar jogador
const adicionarJogador = async (id) => {
    const nome = prompt("Nome do jogador:");
    const telefone = prompt("Telefone:");

    if (!nome || !telefone) return alert("Preencha os dados!");

    await fetch(`${API_URL}/${id}/jogador`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone })
    });

    carregarPartidas();
};

// Confirmar presença do jogador
const confirmarPresenca = async (id, nome) => {
    await fetch(`${API_URL}/${id}/presenca`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    carregarPartidas();
};

// Garantir que o evento do botão seja carregado corretamente
window.onload = () => {
    $('add-partida-btn').addEventListener('click', adicionarPartida);
    carregarPartidas();
};
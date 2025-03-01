const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'partidas.json');

const lerDados = () => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([])); // Cria um arquivo vazio
        }
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const salvarDados = (dados) => {
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 4));
};

module.exports = { lerDados, salvarDados };

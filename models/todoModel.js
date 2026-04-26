const fs = require('fs/promises');

const PATH = '.data/todos.json';

async function leerTodos() {
    try {
        const data = await fs.readFile(PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw new Error(`Error al leer todos: ${error.message}`);
    }
};

async function escribirTodos(todos) {
    try {
        await fs.writeFile(PATH, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (error) {

        throw new Error(`Error al escribir todos: ${error.message}`);
    }
};

module.exports = { leerTodos, escribirTodos };
const { leerTodos, escribirTodos } = require('../models/todoModel');
const { randomUUID } = require('crypto');
/**
 * Lista todos los items y renderiza la vista todo.pug
 */
async function listar(req, res, next) {
    try {
        const todos = await leerTodos();
        res.render('todo', { todos });
    } catch (error) {
        next(error);
    }
};
/**
 * Agrega un nuevo item al TODO
 * Responde con JSON para ser consumido por Ajax
 */
async function agregar(req, res, next) {
    try {
        const { tarea } = req.body;
        // Leer los todos existentes
        const todos = await leerTodos();
        // crear nuevo item con id único y fecha
        const nuevo = {
            id: randomUUID(),
            tarea,
            creado: new Date().toLocaleDateString('es-ES'),
        };
        // Guardar y responder
        todos.push(nuevo);
        await escribirTodos(todos);

        res.json({ ok: true, todo: nuevo });
    } catch (error) {
        next(error);
    }
};

/**
 * Borra un item por su ID
 * responde con JSON para ser consumido por AJAX
 */
async function borrar(req, res, next) {
    try {
        const { id } = req.params;

        // Filtrar pel item a borrar
        const todos = await leerTodos();
        const nuevos = todos.filter(t => t.id !== id);
        // Guardar y responder
        await escribirTodos(nuevos);
        res.json({ ok: true });
    } catch (error) {
        next(error);
    }
};

module.exports = { listar, agregar, borrar };
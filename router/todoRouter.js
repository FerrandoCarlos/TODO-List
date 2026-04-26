const express = require('express');
const router = express.Router();
const { listar, agregar, borrar } = require('../controllers/todoController');


// GET /todo - lista todos los items
router.get('/', listar);

// POST /todo/add — agrega un ítem (Ajax)
router.post('/add', agregar);

// DELETE /todo/delete/:id — borra un ítem (Ajax)
router.delete('/delete/:id', borrar);

module.exports = router;
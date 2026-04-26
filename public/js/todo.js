// Referencia al formulario y la lista
const form = document.getElementById('form-agregar');
const input = document.getElementById('input-tarea');
const lista = document.getElementById('lista-todos');

/**
 * Agregar un nuevo todo cia Ajax (POST /todo/add)
 */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tarea = input.value.trim();
    if (!tarea) {
        mensajeError('La tarea no puede estar vacía');
        return;
    }

    try {
        const res = await fetch('/todo/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tarea }),
        });

        const data = await res.json();
        console.log(data)
        if (data.ok) {
            agregarItemDOM(data.todo);
            input.value = '';
            mensajeError('');// limpiar error
        } else {
            // Mostrar error de validación
            const msg = data.errores?.tarea?.[0] || 'Error al agregar tarea';
            mensajeError(msg);
        }

    } catch (error) {
        console.error(`Error al agregar tarea: ${error}`)
    }
});

/**
 * Borra un todo via Ajax (DELETE /todo/delete/:id)
 * @param {string} id - UUID del todo a borrar
 */

async function borrarTodo(id) {
    try {
        const res = await fetch(`/todo/delete/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();

        if (data.ok) {
            // Eliminar el item del DOM sin recargar
            document.getElementById(`item-${id}`).remove();
        }
    } catch (error) {
        console.error(`Error al borrar tarea: ${error}`);
    }
}

/**
 * Crea y agrega un ítem a la lista en el DOM
 * @param {{ id: string, tarea: string, creado: string }} todo 
 */

function agregarItemDOM(todo) {
    const li = document.createElement('li');
    li.id = `item-${todo.id}`;
    li.className = 'bg-white border border-slate-200 rounded-xl px-5 py-4 flex justify-between  items-center shadow-sm';
    li.innerHTML = `
        <div>
            <p class="text-slate-800 font-medium">${todo.tarea}</p>
            <span class="text-xs text-slate-400">${todo.creado}</span>
        </div>
        <button 
            class="text-red-500 border border-red-200 bg-red-50 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
            onclick="borrarTodo('${todo.id}')"
        >Eliminar</button>
    `;
    lista.appendChild(li);
}

/**
 * Muestra u oculta el mensaje de error debajo del input
 * @param {string} msg
 */

function mensajeError(msg) {
    let p = document.getElementById('error-tarea');
    if (!p) {
        p = document.createElement('p');
        p.id = 'error-tarea';
        p.className = 'text-red-500 text-sm mt-1';
        form.appendChild(p);
    }
    p.textContent = msg;
}
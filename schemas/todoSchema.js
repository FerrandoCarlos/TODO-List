const { z } = require('zod');

const todoSchema = z.object({
    tarea: z
        .string({ required_error: 'La tarea es obligatoria' })
        .trim()
        .min(3, 'La tarea debe tener al menos 3 caracteres')
        .max(200, 'La tarea no puede superar 200 caracteres'),
});

module.exports = { todoSchema };
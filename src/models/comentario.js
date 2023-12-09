import { Schema, model } from 'mongoose';


const ComentarioSchema = new Schema(
    {
        autor: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        descripcion: {
            type: String,
            required: true
        }
    }
)

export const ComentarioModel = model('Comentario', ComentarioSchema);
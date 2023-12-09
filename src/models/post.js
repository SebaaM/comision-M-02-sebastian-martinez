import { Schema, model } from 'mongoose';


const PostSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: false
        },
        autor: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        comentario: {
            type: Schema.Types.ObjectId,
            ref: 'Comentario',
        },
        img_url: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const PostModel = model('Post', PostSchema);
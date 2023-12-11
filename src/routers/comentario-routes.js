import { Router } from 'express';

import {
    ctrlCreateComentario,
    ctrlListComentario,
    ctrlGetComentarioById,
    ctrlUpdateComentario,
    ctrlDeleteComentario,
} from '../controllers/comentario-controller.js';

// import {
//     createComentarioValidations,
//     deleteComentarioValidations,
//     getComentarioValidations,
//     listComentarioValidations,
//     updateComentarioValidations,
// } from '../models/validations/comentario-validations.js';

const comentarioRouter = Router();

// comentarioRouter.post('/:comentarioId/', createComentarioValidations, ctrlCreateComentario);
// comentarioRouter.get('/:comentarioId/', listComentarioValidations, ctrlListComentario);

// comentarioRouter.get('/:comentarioId/:comentarioId', getComentarioValidations, ctrlGetComentarioById);
// comentarioRouter.patch('/:comentarioId/:comentarioId', updateComentarioValidations, ctrlUpdateComentario);
// comentarioRouter.delete('/:comentarioId/:comentarioId', deleteComentarioValidations, ctrlDeleteComentario);

comentarioRouter.post('/:comentarioId/', ctrlCreateComentario);
comentarioRouter.get('/:comentarioId/', ctrlListComentario);

comentarioRouter.get('/:comentarioId/:comentarioId', ctrlGetComentarioById);
comentarioRouter.patch('/:comentarioId/:comentarioId', ctrlUpdateComentario);
comentarioRouter.delete('/:comentarioId/:comentarioId', ctrlDeleteComentario);


export { comentarioRouter };

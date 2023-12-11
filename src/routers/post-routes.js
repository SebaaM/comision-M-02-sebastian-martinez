import { Router } from 'express';

import {
    ctrlCrearPost,
    ctrlDeletePost,
    ctrlGetPost,
    ctrlListPost,
    ctrlUpdatePost,
} from '../controllers/post-controller.js';
// import {
//   createPostValidations,
//   deletePostValidations,
//   getPostValidations,
//   listPostValidations,
//   updatePostValidations
// } from '../models/validations/post-validations.js';

const postRouter = Router();

// postRouter.post('/', createPostValidations, ctrlCreatePost);
// postRouter.get('/', listPostValidations, ctrlListPost);

// postRouter.get('/:postId', getPostValidations, ctrlGetPost);
// postRouter.patch('/:postId', updatePostValidations, ctrlUpdatePost);
// postRouter.delete('/:postId', deletePostValidations, ctrlDeletePost);

postRouter.post('/', ctrlCrearPost);
postRouter.get('/', ctrlListPost);

postRouter.get('/:postId', ctrlGetPost);
postRouter.patch('/:postId', ctrlUpdatePost);
postRouter.delete('/:postId', ctrlDeletePost);

export { postRouter };
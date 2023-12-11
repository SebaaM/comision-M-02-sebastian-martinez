import { Router } from 'express';
import {
    ctrlCrearUsuario,
    ctrlLoginUsuario,
} from '../controllers/usuario-controller.js';

// import {
// import { ctrlCrearUsuario } from './../controllers/usuario-controller';
// loginUserValidations,
//   createUserValidations,
// } from '../models/validations/user-validations.js';

const usuarioRouter = Router();

// authRouter.post('/login', loginUserValidations, ctrlLoginUsuario);
// authRouter.post('/register', createUserValidations, ctrlCrearUsuario);
usuarioRouter.post('/login', ctrlLoginUsuario);
usuarioRouter.post('/register', ctrlCrearUsuario);

export { usuarioRouter };

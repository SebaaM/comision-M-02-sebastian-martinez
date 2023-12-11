import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from "./settings/envs.js"


// import { config } from './src/settings/config.js';
import { startConnection } from './settings/database.js';

import { usuarioRouter } from './src/routers/usuario-routes.js';
import { comentarioRouter } from './src/routers/comentario-routes.js';
import { postRouter } from './src/routers/post-routes.js';
// import { validateToken } from './src/middlewares/validate-token.js';
// import { authHeader } from './src/models/validations/auth-validation.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static("public"))

// , authHeader, validateToken, 
app.use('/api/usuario', usuarioRouter);
app.use('/api/post', postRouter);
app.use('/api/comentario', comentarioRouter);

app.listen(env.PORT, async () => {

    startConnection()
    console.log(`server on port ${env.PORT}`)

})
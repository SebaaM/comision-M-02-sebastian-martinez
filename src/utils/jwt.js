import jwt from 'jsonwebtoken';
import { env } from '../../settings/envs.js';

export const crearJWT = async ({ UsuarioId }) => {
    return new Promise((res, rej) => {
        jwt.sign(
            { UsuarioId },
            env.JWT_SECRET,
            (err, token) => {
                if (err) rej(err);
                res(token);
            }
        );
    });
};

export const verificarJWT = async ({ token }) => {
    return new Promise((res, rej) => {
        jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
            if (err || !decoded.UsuarioId) rej('Token invalido');
            res(decoded);
        });
    });
};

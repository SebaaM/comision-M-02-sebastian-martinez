import { UsuarioModel } from '../models/Usuario.js';
import * as bcrypt from 'bcrypt';
import { crearJWT } from '../utils/jwt.js';

export const ctrlCrearUsuario = async (req, res) => {
    try {
        const usuario = new UsuarioModel(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: "no se pudo crear usuario" });
    }
};

export const ctrlLoginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await UsuarioModel.findOne({ email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return res.status(400).json({ error: 'Credenciales invalidas' });

        const token = await crearJWT({ usuarioId: usuario._id });

        res.status(200).json({ token, usuario });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "No se pudo logear usuario" });
    }
};

import { ComentarioModel } from '../models/comentario.js';
import { isAutor } from './post-controller.js';
import { PostModel } from '../models/post.js';

export const ctrlCreateComentario = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const isAutor = await isAutor({ postId, userId });

    if (!isAutor) {
        return res.status(403).json({ error: 'User is not the post autor' });
    }

    try {
        const comentario = new ComentarioModel({
            ...req.body,
            post: postId,
        });

        await comentario.save();

        await PostModel.findOneAndUpdate(
            { _id: postId },
            { $push: { comentarios: comentario._id } }
        );

        res.status(201).json(comentario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Couldn't create comentario" });
    }
};

export const ctrlListComentario = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const isPostAutor = await isAutor({ postId, userId });

    if (!isPostAutor) {
        return res.status(403).json({ error: 'User is not the post autor' });
    }

    try {
        const comentarios = await ComentarioModel.find({ post: postId }, [
            '-__v',
        ]).populate('post', ['-comentarios', '-autor', '-__v']);

        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get comentarios" });
    }
};

export const ctrlGetComentarioById = async (req, res) => {
    const { comentarioId, postId } = req.params;
    const userId = req.user._id;

    const isPostAutor = await isAutor({ postId, userId });

    if (!isPostAutor) {
        return res.status(403).json({ error: 'User is not the post autor' });
    }

    try {
        const comentario = await ComentarioModel.findOne({
            _id: comentarioId,
            post: postId,
        }).populate('post');

        if (!comentario) return res.status(404).json({ error: "Comentario doesn't exist" });

        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get comentario" });
    }
};

export const ctrlUpdateComentario = async (req, res) => {
    const { comentarioId, postId } = req.params;
    const userId = req.user._id;

    const isPostautor = await isAutor({ postId, userId });

    if (!isPostautor) {
        return res.status(403).json({ error: 'User is not the post autor' });
    }

    try {
        const comentario = await ComentarioModel.findOne({ _id: comentarioId });

        if (!comentario) {
            return res.status(404).json({ error: "Comentario doesn't exist" });
        }

        comentario.set(req.body);

        await comentario.save();

        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ error: "Couldn't update comentario" });
    }
};

export const ctrlDeleteComentario = async (req, res) => {
    const { comentarioId, postId } = req.params;
    const userId = req.user._id;

    const isPostAutor = await isAutor({ postId, userId });

    if (!isPostAutor) {
        return res.status(403).json({ error: 'User is not the post autor' });
    }

    try {
        await ComentarioModel.findOneAndDelete({ _id: comentarioId, post: postId });

        await PostModel.findOneAndUpdate(
            { _id: postId },
            { $pull: { comentarios: comentarioId } }
        );

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: "Couldn't delete comentario" });
    }
};

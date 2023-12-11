import { ComentarioModel } from './../models/comentario.js';
import { PostModel } from './../models/post.js';

export const ctrlCrearPost = async (req, res) => {
    const userId = req.user._id;

    try {
        const { titulo } = req.body;

        const post = new PostModel({
            titulo,
            descripcion,
            autor: userId,
            comentario: [],
            img_url: url,

        });

        await post.save();

        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlListPost = async (req, res) => {
    const userId = req.user._id;

    try {
        const posts = await PostModel.find({ autor: userId })
            .populate('autor', ['username', 'avatar'])
            .populate('comentario', ['autor', 'descripcion']);

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlGetPost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await PostModel.findOne({
            _id: postId,
            autor: userId,
        })
            .populate('autor', ['username', 'avatar'])
            .populate('comentario', ['autor', 'descripcion']);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlUpdatePost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await PostModel.findOne({
            _id: postId,
            autor: userId,
        });

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        post.set(req.body);

        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctrlDeletePost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    try {
        const post = await PostModel.findOne({
            _id: postId,
            autor: userId,
        });

        if (!post) {
            return res.status(404).json({ error: 'Post no encotnrado' });
        }

        await ComentarioModel.deleteMany({ _id: { $in: post.comentario } });

        await PostModel.findOneAndDelete({
            _id: postId,
            autor: userId,
        });

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const isAutor = async ({ postId, userId }) => {
    try {
        const post = await PostModel.findOne({
            _id: postId,
            autor: userId,
        });

        if (!post) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
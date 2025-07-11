import { getAllPosts, getPost, newPost, updatePost, updatePublish, deletePost, getPostsForUser } from "../module/queries.js"
import { validationResult } from "express-validator";

export const getAllPostsInfo = async (req, res) => {
    try {
        const posts = await getPostsForUser();
        if (posts.length < 1) {
            return res.json({message: 'No post found!'})
        }
        res.json(posts)
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllPostsForAuthor = async (req, res) => {
    try {
        const posts = await getAllPosts();
        if (posts.length < 1) {
            return res.json({message: 'No post found!'})
        }
        res.json(posts)
    } catch (error) {
        throw new Error(error)
    }
}

export const getPostInfo = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await getPost(id);

        if (!post) {
            return res.json({message: 'No post'})
        }
        res.json(post);
    } catch (error) {
        console.log(error.message)
    }
}

export const makeNewPost = async (req, res) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()) {
            return res.json(result.array())
        }
        const { text, title} = req.body;
        const user = req.user

        await newPost(text, title, user.id)
        res.json({mssage: 'Success', type: 'success'})
    } catch (error) {
        throw new Error(error);
    }
}

export const editPost = async (req, res) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()) {
            return res.json(result.array())
        }
        const { text, title, publish} = req.body;
        const {id} = req.params;
        if (publish !== undefined) {
            console.log(publish)
            await updatePublish(id, publish)
            res.json({mssage: 'Published', type:'success'})
            return;    
        }

        await updatePost(id, title, text)
        res.json({mssage: 'Updated'})
    } catch (error) {
        throw new Error(error);
    }
}

export const deletPostInfo = async (req, res) => {
    try {
        const {id} = req.params;
        await deletePost(id);

        res.json({message: 'deleted', type: 'info'});
    } catch (error) {
        console.error(error.message)
    }
}
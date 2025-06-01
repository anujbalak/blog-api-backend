import { getAllPosts, getPost, newPost } from "../module/queries.js"
import { validationResult } from "express-validator";

export const getAllPostsInfo = async (req, res) => {
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
        await newPost(text, title, '9233fc67-8c37-4095-a15b-918470af9e12')
        res.json({mssage: 'Success'})
    } catch (error) {
        throw new Error(error);
    }
}

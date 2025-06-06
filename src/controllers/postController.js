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
        console.log('from post controller', req.body)
        if(!result.isEmpty()) {
            return res.json(result.array())
        }
        const { text, title} = req.body;
        const user = req.user

        await newPost(text, title, user.id)
        res.json({mssage: 'Success'})
    } catch (error) {
        throw new Error(error);
    }
}

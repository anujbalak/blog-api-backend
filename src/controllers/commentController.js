import { validationResult } from "express-validator";
import { addComment, deleteCommentFromDb, editCommentOnDb, getAllComments, getComment } from "../module/queries.js"
import { messageOnNtfy } from "../module/ntfy.js";

export const getAllCommentsInfo = async (req, res) => {
    try {
        const {id} = req.params
        const comments = await getAllComments(id)
        if(!comments) {
            return res.json({message: 'Something is wrong'});
        }
        if(comments.lenth < 1) {
            return res.json({message: 'No comments yet'});
        }
        res.json(comments);
    } catch (error) {
        throw new Error(error)
    }
}

export const getCommentInfo = async (req, res) => {
    try {
        const { id, commentId} = req.params;
        const comment = await getComment(id, commentId)
        if (!comment) {
            return res.status(400).json({message: 'No comment found'});
        }
        res.json(comment);
    } catch (error) {
        throw new Error(error);
    }
}

export const postNewComment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const response = {errors: errors.array(), type: 'warn'}
            return res.status(400).json(response);
        }

        const {id} = req.params;
        const { comment } = req.body

        if (!req.user) {
            return res.json({message: 'Sign in again!'})
        }
        
        const userid = req.user.id;

        await addComment(comment, userid, id);
        //await messageOnNtfy(comment);
        
        res.json({message: 'Commented', type: 'info'})
    } catch (error) {
        throw new Error(error);       
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCommentFromDb(id);
        res.json({message: 'Comment removed', type: 'info'})
    } catch (error) {
        console.error(error);
    }
}

export const editComment = async (req, res) => {
    try {
        const errors = validationResult(req);
        const {id} = req.params;
        const { comment } = req.body
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        
        await editCommentOnDb(id, comment);

        res.json({message: 'Edited', type: 'success'})
    } catch (error) {
        throw new Error(error);       
    }
}
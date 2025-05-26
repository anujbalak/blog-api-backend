import { addComment, getAllComments, getComment } from "../module/queries.js"

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
            return res.json({message: 'No comment found'});
        }
        res.json(comment);
    } catch (error) {
        throw new Error(error);
    }
}

export const postNewComment = async (req, res) => {
    try {
        const {id} = req.params;
        const { text } = req.body

        await addComment(text, req.user.id, id);
        res.json({message: 'Commented'})
    } catch (error) {
        throw new Error(error);       
    }
}
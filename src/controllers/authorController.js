import { getAuthor } from "../module/queries.js";

export const getAuthorInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await getAuthor(id);
        res.status(200).json(author);
    } catch (error) {
        throw new Error(error.message)
    }
}
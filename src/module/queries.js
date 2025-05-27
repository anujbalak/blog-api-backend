import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient()

export const getAllPosts = async () => {
    const posts = await prisma.post.findMany();
    console.log(posts)
    return posts
}

export const getPost = async (id) => {
    const post = await prisma.post.findFirst({
        where: {
            id,
        },
        include: {
            Comment: true,
        },
    });
};

export const getUser = async (id) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });
    return user;
};

export const getUserByEmail = async (email) => {
    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });
    return user; 
}

export const getUserByUsername = async (username) => {
    const user = await prisma.user.findFirst({
        where: {
            username,
        }
    });
    return user; 
}

export const addUser = async (username, email, password) => {
    await prisma.user.create({
        data: {
            username,
            email,
            password,
        }
    })
}

export const addAdmin = async (username, email, password) => {
    await prisma.user.create({
        data: {
            username,
            email,
            password,
            role: "ADMIN",
        },
    });
};

export const updateUser = async ({id, username, email, password}) => {
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            email,
            password,
            username
        }
    })
}

export const addComment = async (text, userid, postId) => {
    await prisma.comment.create({
        data: {
            text,
            userid,
            postId,
        },
    });
};

export const getAllComments = async (postId) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId
        },
    });
}

export const getComment = async (postId, id) => {
    const comments = await prisma.comment.findFirst({
        where: {
            id,
            postId,
        },
    });
};

export const newPost = async (text, title, authorid) => {
    await prisma.post.create({
        data: {
            text,
            title,
            authorid,
        },
    });
};

const sessionUser = async () => {
    const user = await prisma.session.findMany();
    console.log(user)
}

getUserByEmail('fake@mail.com')
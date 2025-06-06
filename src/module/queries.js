import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient()

export const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            Comment: {
                include: {
                    user: true,
                    post: true,
                }
            },
        },
    });
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
    return post;
};

export const getUser = async (id) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });
    return user;
};

export const getUserForClient = async (id) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
        select: {
            id: true, 
            username: true,
            email: true,
            role:true,
        }
    });
    return user;
};

export const getAuthor = async (id) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
            role: 'ADMIN'
        },
        select: {
            id: true,
            username: true,
            email: true
        }
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

export const updateUsername = async ({id, username}) => {
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            username,
        }
    })
}

export const updateEmail = async ({id, email}) => {
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            email,
        }
    })
}

export const updatePassword = async ({id, password}) => {
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            password,
        },
    })
};

export const addComment = async (text, userid, postId) => {
    await prisma.comment.create({
        data: {
            text,
            userid,
            postId,
        },
    });
};

export const deleteCommentFromDb = async (id) => {
    await prisma.comment.delete({
        where: {
            id,
        },
    });
};

export const editCommentOnDb = async (id, text) => {
    const comment = await prisma.comment.update({
        where: {
            id,
        },
        data: {
            text,
        },
    });
    console.log(comment)
};

export const getAllComments = async (postId) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId
        },
    });
    return comments
}

export const getComment = async (postId, id) => {
    const comments = await prisma.comment.findFirst({
        where: {
            id,
            postId,
        },
    });
    return comments
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
import { PrismaClient } from "../../generated/prisma/client.js";
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

export const session = expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 1000,
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        },
    )
});
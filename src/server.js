import 'dotenv/config.js'
import Fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import { ZodError } from 'zod'

import { routes } from "./routes/index.js"
import { redis } from './database/redis.js'
import { AppError } from './errors/AppError.js';

const fastify = Fastify({
    logger: true
})

fastify.register(fastifyMultipart, { attachFieldsToBody: true });

fastify.register(routes, { prefix: '/api/v1' });

fastify.register(fastifyCookie, {
    secret: process.env.APP_SECRET,
    hook: 'onRequest',
    parseOptions: {
        httpOnly: true,
        path: '/api/v1/'
    }

});




fastify.setErrorHandler((error, request, reply) => {


    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: 'Validation error', message: error.issues.map((erro) => {
                return erro.message
            })
        });
    } else if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.error, message: error.message });
    }

    return reply.status(500).send(error);
});







fastify.listen({ port: 3333 }).then(() => {

    console.log("server is running on http://localhost:3333/api/v1");
});


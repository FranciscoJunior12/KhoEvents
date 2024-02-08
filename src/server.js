
import Fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';

import { routes } from "./routes/index.js"

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

})


fastify.listen({ port: 3333 }).then(() => {

    console.log("server is running on http://localhost:3333/api/v1");
});


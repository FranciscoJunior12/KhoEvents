
import Fastify from 'fastify'


import { routes } from "./routes/index.js"
import { communities } from './routes/community.route.js';


const fastify = Fastify({
    logger: true
})

fastify.register(routes);
fastify.register(communities);




fastify.listen({ port: 3000 }).then(() => {

    console.log("server is running on http://localhost:3000");
})


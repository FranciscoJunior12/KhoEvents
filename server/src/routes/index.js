
import { communityRoutes } from './communities.routes.js';
import { eventsRoutes } from './events.routes.js';
import { sessionsRoutes } from './sessions.routes.js';

import { ticketsRoutes } from './tickets.routes.js';



export async function routes(fastify, options) {

    fastify.get('/status', (request, reply) => {
        return reply.send({ Ok: true });
    });


    fastify.register(communityRoutes, { prefix: '/communities' });
    fastify.register(eventsRoutes, { prefix: '/events' });
    fastify.register(ticketsRoutes, { prefix: '/tickets' });
    fastify.register(sessionsRoutes, { prefix: '/sessions' });
}

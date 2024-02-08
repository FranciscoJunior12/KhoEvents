
import { communityRoutes } from './communities.routes.js';
import { eventsRoutes } from './events.routes.js';
import { sessionsRoutes } from './sessions.routes.js';

import { ticketsRoutes } from './tickets.routes.js';



export async function routes(fastify, options) {

    fastify.get('/', (request, reply) => {
        return reply.send({ title: 'Hello Khodar ', message: 'Sejam bem vindos a sala mais cool!!!!!!' });
    });


    fastify.register(communityRoutes, { prefix: '/communities' });
    fastify.register(eventsRoutes, { prefix: '/events' });
    fastify.register(ticketsRoutes, { prefix: '/tickets' });
    fastify.register(sessionsRoutes, { prefix: '/sessions' });
}

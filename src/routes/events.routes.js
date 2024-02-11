import { EventController } from "../controller/eventController.js";
import { auth } from "../hooks/auth.js";
import { upload } from "../hooks/upload.js";
const eventController = new EventController();

export async function eventsRoutes(fastify, options) {

    fastify.get('/', (request, reply) => eventController.list(request, reply));
    fastify.register(authRoutes)

}


async function authRoutes(fastify) {

    fastify.decorateRequest('communityId', '');
    fastify.addHook('preHandler', auth);

    fastify.delete('/:id', (request, reply) => eventController.delete(request, reply));

    fastify.post('/', { preHandler: upload('banner') }, (request, reply) => eventController.create(request, reply));

}

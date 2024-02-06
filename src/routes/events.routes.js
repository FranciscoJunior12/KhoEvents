

import { EventController } from "../controller/eventController.js";
import { upload } from "../hooks/upload.js";
const eventController = new EventController();

export async function eventsRoutes(fastify, options) {


    fastify.post('/', { preHandler: upload('banner') }, (request, reply) => eventController.create(request, reply))
    fastify.get('/', (request, reply) => eventController.list(request, reply))
}


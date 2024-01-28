

import { EventController } from "../controller/eventController.js";
import { upload } from "../hooks/upload.js";
const eventController = new EventController();

export async function eventsRoutes(fastify, options) {


    fastify.post('/', { preHadler: upload('banner') }, (request, reply) => eventController.create(request, reply))
}


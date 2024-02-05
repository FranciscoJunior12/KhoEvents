
import { CommunityController } from "../controller/communityController.js";

const communityController = new CommunityController();

import { upload } from '../hooks/upload.js'

export async function communityRoutes(fastify, options) {



    fastify.post('/', (request, reply) => communityController.create(request, reply));

    fastify.get("/", (request, reply) => communityController.list(request, reply));

    fastify.get("/:id", (request, reply) => communityController.show(request, reply));

    fastify.put("/", (request, reply) => communityController.update(request, reply));

    fastify.patch('/avatar', { preHandler: upload("avatar") }, (request, reply) => communityController.updateAvatar(request, reply));
}
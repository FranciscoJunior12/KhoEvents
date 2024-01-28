
import { CommunityController } from "../controller/communityController.js";

const communityController = new CommunityController();


export async function communities(fastify, options) {


    fastify.post('/communities', (request, reply) => communityController.create(request, reply));
    fastify.get("/communities", (request, reply) => communityController.show(request, reply));
    fastify.put("/communities/:id", (request, reply) => communityController.update(request, reply));
    fastify.delete("/communities/:id", (request, reply) => communityController.delete(request, reply));
}

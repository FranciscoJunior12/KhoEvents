
import { CommunityController } from "../controller/CommunityController.js";
import { auth } from "../hooks/auth.js";

const communityController = new CommunityController();

import { upload } from '../hooks/upload.js'

export async function communityRoutes(fastify, options) {


    fastify.post('/', (request, reply) => communityController.create(request, reply));

    fastify.get("/", (request, reply) => communityController.list(request, reply));

    fastify.get("/:id", (request, reply) => communityController.show(request, reply));
    fastify.patch("/verify/:token", (request, reply) => communityController.verify(request, reply));

    fastify.register(authRoutes);


}



async function authRoutes(fastify) {
    fastify.decorateRequest('communityId', '');
    fastify.addHook('preHandler', auth);

    fastify.put("/", (request, reply) => communityController.update(request, reply));

    fastify.patch('/avatar', { preHandler: upload("avatar") }, (request, reply) => communityController.updateAvatar(request, reply));

}
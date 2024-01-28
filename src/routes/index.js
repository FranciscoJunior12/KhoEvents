
import { CommunityController } from "../controller/communityController.js";

const communityController = new CommunityController();

export async function routes(fastify, options) {


    fastify.get("/", (request, reply) => {
        return reply.status(200).send({ msg: "Hello world" });
    });
}

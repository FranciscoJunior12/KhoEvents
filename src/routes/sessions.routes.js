
import { SessionController } from "../controller/SessionsController.js"
import { auth } from "../hooks/auth.js";

const sessionController = new SessionController();


export async function sessionsRoutes(fastify, options) {


    fastify.post("/", (request, reply) => sessionController.login(request, reply));
    fastify.delete("/",  (request, reply) => sessionController.logout(request, reply));

}

import { SessionController } from "../controller/SessionsController.js"


const sessionController = new SessionController();


export async function sessionsRoutes(fastify, options) {


    fastify.post("/", (request, reply) => sessionController.login(request, reply));
    fastify.delete("/", (request, reply) => sessionController.logout(request, reply));
    fastify.patch("/reset-password", (request, reply) => sessionController.resetPassword(request, reply));

}
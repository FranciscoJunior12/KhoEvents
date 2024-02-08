
import { SessionController } from "../controller/SessionsController.js"


const sessionController = new SessionController();


export async function sessionsRoutes(fastify, options) {


    fastify.post("/", (request, reply) => sessionController.login(request, reply))

}
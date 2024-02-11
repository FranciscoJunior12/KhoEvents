
import { TicketController } from "../controller/TicketController.js";


const ticketController = new TicketController();


export async function ticketsRoutes(fastify, options) {

    fastify.post('/', (request, reply) => ticketController.create(request, reply));

    fastify.register(authRoutes)
}

async function authRoutes(fastify) {
    //list all attendee of one event based on eventID
    fastify.get('/:id', (request, reply) => ticketController.list(request, reply));

}


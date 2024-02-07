
import { TicketController } from "../controller/TicketController.js";

const ticketController = new TicketController();


export async function ticketsRoutes(fastify, options) {

    fastify.post('/', (request, reply) => ticketController.create(request, reply));
    fastify.get('/:id', (request, reply) => ticketController.list(request, reply));


}
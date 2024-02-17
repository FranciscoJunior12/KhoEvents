import { AppError } from "../errors/AppError.js";
import { TicketsRepository } from "../repositories/TicketsRepository.js";


export class TicketController {

    repository = new TicketsRepository();

    async create(request, reply) {

        const { attendeeName, attendeeEmail, eventId } = request.body;

        const ticketExists = await this.repository.getByEmail({ attendeeEmail });


        if (ticketExists) throw new AppError("Registation failed", "User email already register on this event!", 401);


        await this.repository.create({ attendeeName, attendeeEmail, eventId });

        return reply.status(201).send();

    }

    async list(request, reply) {

        const { page = 0 } = request.query;
        const { id } = request.params;

        const events = await this.repository.list({ eventId: id, page });

        return reply.status(200).send(events);

    }


}


import { prisma } from '../database/index.js';

export class TicketsRepository {

    client = prisma.ticket;

    async create({ attendeeName, attendeeEmail, eventId }) {

        const ticket = await this.client.create({

            data: { attendeeName, attendeeEmail, eventId }

        })

        return ticket;
    }


    async getByEmail({ attendeeEmail }) {

        const ticket = await this.client.findUnique({
            where: {
                attendeeEmail
            }
        })


        return ticket;
    }

    async list({ eventId, page }) {

        const tickets = await this.client.findMany({
            where: {
                eventId
            },

            skip: 10 * page,
            take: 10
        })


        return tickets;
    }




}
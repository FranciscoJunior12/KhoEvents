import { prisma } from "../database/index.js";


export class EventRepository {

    client = prisma.event;

    async save({ title, description, date, startTime, endTime,local, limit, bannerId, communityId }) {

        const event = await this.client.create({

            data: {
                title,
                description,
                date: new Date(date),
                startTime,
                endTime,
                limit: Number(limit),
                banner_id: bannerId,
                communityId,


            }
        })

        return event;

    }

    async list({ title, page, communityId }) {

        const events = await this.client.findMany({
            where: {
                title: {
                    contains: title
                },
                communityId,
                status: "PUBLISHED"
            },
            skip: 10 * page,
            take: 10
        });

        return events;

    }


    async update(id, { title, description, date, status, local,startTime, endTime, limit, banner, communityId }) {


        await this.client.update({

            where: {
                id
            },
            data: {
                title,
                description,
                date,
                startTime,
                endTime,
                limit,
                banner,
                communityId,
                status,
                local
            }

        })


    }


    async getById({ eventId }) {

        const event = await this.client.findUnique({
            where: {
                id: eventId
            }
        });

        return event;

    }

}
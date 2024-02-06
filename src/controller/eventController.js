
import dayjs from "dayjs";

import { parseTimeToDate } from '../utils/dates.js'

import { EventRepository } from "../repositories/EventsRepository.js";

export class EventController {

    repository = new EventRepository();

    async create(request, reply) {

        const { title, description, date, startTime, endTime, limit, banner, communityId } = request.body;

        const parsedStartTime = parseTimeToDate(startTime);
        const parsedEndTime = parseTimeToDate(endTime);

        if (dayjs(parsedEndTime).isBefore(dayjs(parsedStartTime))) return reply.status(400).send({ error: 'Invalid time' });

        await this.repository.save({
            title,
            description,
            date,
            startTime,
            endTime,
            limit,
            bannerId: banner.id,
            communityId
        })

        return reply.status(201).send();
    }

    async list(request, reply) {

        const { title, page = 0, communityId } = request.query;

        const events = await this.repository.list({ title, page, communityId });

        return reply.status(200).send(events);
    }

}
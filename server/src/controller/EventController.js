
import dayjs from "dayjs";

import { parseTimeToDate } from '../utils/dates.js'

import { EventRepository } from "../repositories/EventsRepository.js";
import { AppError } from "../errors/AppError.js";

export class EventController {

    repository = new EventRepository();

    async create(request, reply) {

        const { title, description, date, local, startTime, endTime, limit, banner, communityId } = request.body;

        const parsedStartTime = parseTimeToDate(startTime);
        const parsedEndTime = parseTimeToDate(endTime);

        if (dayjs(parsedEndTime).isBefore(dayjs(parsedStartTime))) throw new AppError('Invalid time', 'endTime can not be before startTime', 400);

        await this.repository.save({
            title,
            description,
            date,
            startTime,
            endTime,
            local,
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

    async delete(request, reply) {

        const { id } = request.params;

        const event = await this.repository.getById({ eventId: id });

        if (!event) throw new AppError("Not found", "event not found", 404);

        await this.repository.update(id, { status: "CANCELLED" })

        return reply.status(200).send();
    }

    async getById(request, reply) {

        const { id } = request.params;

        const event = await this.repository.getById({ eventId: id })

        if (!event) throw new AppError("Not found", "event not found", 404);


        return reply.status(200).send(event);

    }


}
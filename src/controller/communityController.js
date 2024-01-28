
import { CommunityRepository } from "../repositories/CommunitiesRepository.js";




export class CommunityController {

    repository = new CommunityRepository();

    async create(request, reply) {

        const { name, email, password } = request.body;

        const community = await this.repository.save({ name, email, password });

        return reply.status(201).send(community);
    }

    async list(request, reply) {

        const { name } = request.query;

        const communities = await this.repository.list({ name });

        return reply.status(200).send(communities);

    }

    async show(request, reply) {

        const { id } = request.params;

        const community = await this.repository.getById({ id });

        if (!community) {
            return reply.status(404).send({
                mesage: "Community not found"
            })
        }

        return reply.status(200).send(community);


    }
    
}



import { CommunityRepository } from "../repositories/CommunitiesRepository.js";

import { sendMail } from '../lib/mail.js'


export class CommunityController {

    repository = new CommunityRepository();

    async create(request, reply) {


        const { name, email, password } = request.body;

        // const communityExists = await this.repository.getByEmail(email);

        // if (communityExists) return reply.status(400).send({ error: "community already exists" });

        // await this.repository.save({ name, email, password });

        try {
            await sendMail({
                subject: "verfique o seu email",
                to: email,
                text: `clique no link para verificar o seu email`

            });

        } catch (error) {

            return reply.send({ error })
        }

        return reply.status(201).send();
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
    async update(request, reply) {


        const { name, email, password, website, description, communityId } = request.body;

        const communityExists = await this.repository.getByEmail(email);

        if (communityExists) return reply.status(400).send({ error: "community already exists" });

        await this.repository.update(communityId, { name, email, password, website, description })

        return reply.status(200).send();
    }

    async updateAvatar(request, reply) {

        const { communityId, avatar } = request.body;

        await this.repository.update(communityId, { avatarId: avatar.id })

        return reply.status(200).send();
    }

}


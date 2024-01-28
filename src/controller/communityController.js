
import { CommunityRepository } from "../repositories/communityRepository.js";

const communityRepository = new CommunityRepository();


export class CommunityController {

    create(request, reply) {

        const { name, email, password } = request.body;

        const community = communityRepository.save({ name, email, password });

        delete community.password;

        return reply.status(201).send(community);
    }

    show(request, reply) {

        const communityList = communityRepository.list();

        return reply.status(200).send(communityList)

    }

    update(request, reply) {

        const { id } = request.params;
        const { name, email, password } = request.body;

        const updatedCommunity = communityRepository.update(id, { name, email, password });

        return reply.status(200).send(updatedCommunity);

    }

    delete(request, reply) {

        const { id } = request.params;

        const deletedCommunity = communityRepository.destroy(id);

        return reply.status(200).send(deletedCommunity)

    }


}
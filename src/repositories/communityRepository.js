
import { randomUUID } from "crypto"

const communities = new Map();

export class CommunityRepository {

    save(community) {
        const id = randomUUID();

        communities.set(id, community)

        return {
            id,
            ...community
        }

    }

    list() {

        const communitiesArray = Array.from(communities).map((community) => {
            return {
                id: community[0],
                ...community[1]
            }

        });;

        return communitiesArray;
    }

    update(id, data) {

        //Logical to delete a communit here:
        const communitToUpdate = communities.get(id);

        if (!communitToUpdate) return { msg: " Community Does not exist" }

        communities.set(id, { id: id, ...data });

        return communities.get(id);

    }
    destroy(id) {

        //Logical to delete a communit here:
        const communitToUpdate = communities.get(id);

        if (!communitToUpdate) return { msg: " Community Does not exist" }

        communities.delete(id)

        return { msg: " Community successfully deleted" }


    }

}
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { CommunityRepository } from "../repositories/CommunitiesRepository.js"

export class SessionController {

    repository = new CommunityRepository();


    async login(request, reply) {

        const { email, password } = request.body
        const community = await this.repository.getByEmail(email, { password: true });

        if (!community) return reply.status(400).send({ msg: "Authentication falied" });

        if (!(await bcrypt.compare(password, community.password))) return reply.status(400).send({ msg: "email or password invalid" });

        delete community.password;

        const token = jwt.sign(

            {
                id: community.id
            },
            process.env.APP_SECRET,
            { expiresIn: "1d" }
        );

        return reply.setCookie('auth', token, {
            maxAge: 60 * 60 * 24
        })
            .send(community);
    }


    async logout(request, reply) {

        return reply.clearCookie('auth').status(204).send();


    }
}
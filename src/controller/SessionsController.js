import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import {randomUUID} from 'crypto'

import { CommunityRepository } from "../repositories/CommunitiesRepository.js"
import { redis } from "../database/redis.js";
import { sendMail } from "../lib/mail.js";

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

    async resetPassword(request, reply) {

        const { email } = request.body;

        const resetToken = randomUUID();
        await redis.set(`reset_password_${resetToken}`, email, 1800);
        const resetLink = `http://localhost:3333/api/v1/communities/reset-password/${resetToken}`

        try {

            await sendMail({
                subject: "Reset Password",
                to: email,
                text: `clique no <a href="${resetLink}">link </a>para fazer reset da sua password`

            });

            return reply.status(204).send();

        } catch (error) {

            return reply.send({ error })
        }


    }
}   
import { randomUUID } from 'crypto'
import { z } from 'zod'

import { CommunityRepository } from "../repositories/CommunitiesRepository.js";
import { sendMail } from '../lib/mail.js'
import { redis } from '../database/redis.js';
import { AppError } from '../errors/AppError.js';
import { error } from 'console';


export class CommunityController {

    repository = new CommunityRepository();

    async create(request, reply) {

        const BodySchema = z.object({
            name: z.string().min(3, { message: 'Name must be 3 or more characters long ' }),
            email: z.string().email({ message: "Invalid email" }),
            password: z.string().min(6, { message: 'Password must be 6 or more characters long' })
        });

        const { name, email, password } = BodySchema.parse(request.body);

        const communityExists = await this.repository.getByEmail(email);

        if (communityExists) throw new AppError("Community creation", 'email already registed', 403);

        const { id } = await this.repository.save({ name, email, password });

        const verifyToken = randomUUID();
        await redis.set(`verify_${verifyToken}`, id, 1800);

        try {

            await sendMail({
                subject: "Verificação de email",
                to: email,
                text: `clique no <a href="${process.env.VERIFIED_ACCOUNT_URL}verify/${verifyToken}">link </a>para completar seu cadastro.`

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

        if (!community) throw new AppError("Not Found", "Community not found", 404)

        return reply.status(200).send(community);


    }
    async update(request, reply) {



        const { name, email, password, website, description, communityId } = request.body;

        // const communityExists = await this.repository.getByEmail(email);

        // if (communityExists) return reply.status(400).send({ error: "community already exists" });

        await this.repository.update(communityId, { name, email, website, description })

        return reply.status(200).send();
    }

    async updateAvatar(request, reply) {

        const { communityId, avatar } = request.body;

        await this.repository.update(communityId, { avatarId: avatar.id })

        return reply.status(200).send();
    }



    async verify(request, reply) {

        const { token } = request.params;

        const communityId = await redis.get(`verify_${token}`);
        console.log(communityId);
        if (!communityId) return new AppError('invalid token', 'Invalid verify token inalid or expired', 403);

        await this.repository.update(communityId, { verified: true });

        await redis.delete(`verify_${token}`);

        return reply.status(204).send();

    }

    async resetPassword(request, reply) {

        const { token } = request.params;
        const { password } = request.body;

        const email = await redis.get(`reset_password_${token}`);

        const community = await this.repository.getByEmail(email);

        await this.repository.updatePassword(community.id, password);

        await redis.delete(`reset_password_${token}`);

        return reply.status(204).send();

    }


    async resendEmail(request, reply) {


        const { email } = request.body;

        const community = await this.repository.getByEmail(email);

        if (!community) throw new AppError("faild to resend link", 'email not registed', 403);

        const verifyToken = randomUUID();

        await redis.set(`verify_${verifyToken}`, community.id, 1800);

        try {

            await sendMail({
                subject: "verfique o seu email",
                to: email,
                text: `clique no <a href="${process.env.VERIFIED_ACCOUNT_URL}verify/${verifyToken}">link </a>para verificar o seu email`

            });

            return reply.status(204).send();
        } catch {
            return reply.send({ error })
        }

    }

}


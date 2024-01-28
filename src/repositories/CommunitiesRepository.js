import bcrypt from 'bcrypt'

import { prisma } from "../database/index.js";



export class CommunityRepository {
    client = prisma.community;

    async save({ name, email, password }) {
        const passwordHash = await bcrypt.hash(password, 10);
        const community = await this.client.create({
            data: {
                name,
                email,
                password: passwordHash
            }

        });


        return community;
    }

    async list({ name }) {

        const communities = this.client.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                website: true,
                description: true,
                password: false,
                createdAt: true,
                updatedAt: true
            },
            where: {
                name: {
                    contains: name
                }
            }
        });

        return communities;
    }


    async getById({ id }) {

        const community = await this.client.findUnique({
            where: {
                id: id
            }
        })

        return community;

    }

}
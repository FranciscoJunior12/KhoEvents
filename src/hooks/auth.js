import jwt from "jsonwebtoken";

export async function auth(request, reply, done) {


    const { auth: token } = request.cookies;

    try {

        var { id } = jwt.verify(token, process.env.APP_SECRET)
        request.communityId = id;

    } catch (error) {

        return reply.status(401).send({ error: "invalid token or expired" });

    }

    await done();


}
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

export function auth(request, reply, done) {


    const { auth: token } = request.cookies;

    try {

        var { id } = jwt.verify(token, process.env.APP_SECRET);

        request.body.communityId = id;

    } catch (error) {

        throw new AppError("invalid token or expired", "Login required", 401);

    }

    done();


}
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub : string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization
    
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try{
        const { sub } = verify(token, "08726250ec1f9a36d34df2793ff2a17d") as IPayload

        request.user_id = sub

        return next();
    }catch(err){
        return response.status(401).end
    }

}
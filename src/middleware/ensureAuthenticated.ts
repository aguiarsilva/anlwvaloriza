import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //receive token
    const authToken = request.headers.authorization
    
    
    //validate if token is filled
    if(!authToken) {
        return response.status(401).end();
    }

    //validate if token is valid

    const [,token] = authToken.split(" ");
try {
    const { sub } = verify ( token, "4f93ac9d10cb751b8c9c646bc9dbccb9") as IPayload;
    //recover user information

    request.user_id = sub;

    return next();
} catch(err) {
    return response.status(401).end();
}


}

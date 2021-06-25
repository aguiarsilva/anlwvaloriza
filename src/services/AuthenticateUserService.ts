import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string,
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verify if email exists
        const user = await usersRepositories.findOne({
            email,
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }
        // Verify if password is correct

            //password  and passwordHash and compare
            const passwordMatch = await compare(password, user.password);

            if(!passwordMatch) {
                throw new Error("Email/Password incorrect");
            }

        //Generate Token
            const token = sign({
                email: user.email,

            }, "3631d7481b82b2f6d7fe6164ca6ce619", {
                subject: user.id,
                expiresIn: "1d"
            } 
        );
        return token;
    }
}

export { AuthenticateUserService };
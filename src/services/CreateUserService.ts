import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({ name, email, admin }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);
//verify if there is a valid email
        if(!email) {
            throw new Error("email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });
// verify if email already exists 
        if(userAlreadyExists){
            throw new Error("User already exists");
        }
// create instance
        const user = usersRepository.create({
            name,
            email,
            admin
        })
// save object to database
        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
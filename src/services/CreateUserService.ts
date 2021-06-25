import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({ name, email, admin = false, password }: IUserRequest) {
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
//before Repository call we add the hash criptography to password
const passwordHash = await hash(password, 8);


// create instance
        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });
// save object to database
        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
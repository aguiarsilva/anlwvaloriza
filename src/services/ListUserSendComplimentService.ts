import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';


//Create list class
class ListUserSendComplimentsService {
    async execute(user_id: string) {
        // get the compliments repository
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        // extract all the compliments from repository
        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: user_id
            }
        })

        return compliments
    }
}

export { ListUserSendComplimentsService };
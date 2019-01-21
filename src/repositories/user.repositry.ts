import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findUserByName(firstname: string, lastname: string) {
        return this.findOne({ where: { firstname, lastname}, relations: ["offices"]});
    }

    async createAndSave(firstname: string, lastname: string) {
        const user = new User(firstname, lastname);
        return this.manager.save(user);
    }

    async transactionCreateAndSave(firstname: string, lastname: string) {
        return this.manager.transaction(async transactionalManager => {
            const user = new User(firstname, lastname);
            await transactionalManager.save(user);
            await transactionalManager.save(user);
        });
    }
}

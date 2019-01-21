import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { Office } from "../entity/office.entity";

@EntityRepository(Office)
export class OfficeRepository extends Repository<Office> {
    async createAndSave(name: string, user: User) {
        const office = new Office(name);
        office.user = user;
        return this.manager.save(office);
    }
}

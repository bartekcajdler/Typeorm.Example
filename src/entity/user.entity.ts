import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Office } from "./office.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: number;

    @OneToMany(type => Office, office => office.user)
    offices: Office[];

	constructor(firstname?: string, lastname?: string) {
	    this.firstname = firstname;
	    this.lastname = lastname;
    }
}

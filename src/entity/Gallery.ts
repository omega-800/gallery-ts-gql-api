import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Entry } from "./Entry";
import { FileData } from "./File";
import { Product } from "./Product";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: Entry })
@Entity("galleries")
export class Gallery extends Entry {
    @Field()
    @Column({ type: "varchar", length: 200 })
    name: string
    @Field(type => [FileData])
    @ManyToMany(() => FileData, (file) => file.galleries)
    @JoinTable()
    files: FileData[];
    @Field(type => Product, { nullable: true })
    @OneToOne((type) => Product, (product) => product.gallery, { nullable: true })
    product?: Product | null
}
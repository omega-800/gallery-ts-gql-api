import { Entity, ManyToMany } from "typeorm";
import { UniqueNamedEntry, Entry } from "./Entry";
import { Product } from "./Product";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: [UniqueNamedEntry, Entry] })
@Entity("tags")
export class Tag extends UniqueNamedEntry {
    @Field(type => [Product], { nullable: "itemsAndList" })
    @ManyToMany(() => Product, (product) => product.tags)
    products: Product[]
}
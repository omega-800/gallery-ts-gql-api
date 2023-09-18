import { Entity, ManyToMany } from "typeorm";
import { StrictNamedEntry, Entry } from "./Entry";
import { Product } from "./Product";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: [StrictNamedEntry, Entry] })
@Entity("tags")
export class Tag extends StrictNamedEntry {
    @Field(type => [Product], { nullable: "itemsAndList" })
    @ManyToMany(() => Product, (product) => product.tags)
    products: Product[]
}
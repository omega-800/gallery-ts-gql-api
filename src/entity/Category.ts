import { Entity, OneToMany } from "typeorm";
import { Entry, StrictNamedEntry } from "./Entry";
import { ShopItem } from "./ShopItem";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: [StrictNamedEntry, Entry] })
@Entity("categories")
export class Category extends StrictNamedEntry {
    @Field(type => [ShopItem], { nullable: "itemsAndList" })
    @OneToMany(() => ShopItem, (shop_item) => shop_item.category)
    shop_items: ShopItem[]
}
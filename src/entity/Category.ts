import { Entity, OneToMany } from "typeorm";
import { Entry, UniqueNamedEntry } from "./Entry";
import { ShopItem } from "./ShopItem";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: [UniqueNamedEntry, Entry] })
@Entity("categories")
export class Category extends UniqueNamedEntry {
    @Field(type => [ShopItem], { nullable: "itemsAndList" })
    @OneToMany(() => ShopItem, (shop_item) => shop_item.category)
    shop_items: ShopItem[]
}
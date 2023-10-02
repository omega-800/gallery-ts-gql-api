import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { DescEntry, Entry } from "./Entry";
import { FileData } from "./File";
import { ShopItem } from "./ShopItem";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: [DescEntry, Entry] })
@Entity("galleries")
export class Gallery extends DescEntry {
    @Field(type => [FileData])
    @ManyToMany(() => FileData, (file) => file.galleries)
    files: FileData[];
    @Field(type => [ShopItem], { nullable: "itemsAndList" })
    @ManyToMany(() => ShopItem, (shop_item) => shop_item.galleries)
    shop_items: ShopItem[]
}
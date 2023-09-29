import { Entity, Column, ManyToOne, JoinTable, ManyToMany, Check, JoinColumn, OneToOne } from "typeorm";
import { DescEntry, Entry } from "./Entry";
import { Category } from "./Category";
import { Field, Float, ObjectType } from "type-graphql";
import { ArrayNotEmpty, IsNotEmpty, ValidateIf } from "class-validator";
import { FileData } from "./File";
import { Gallery } from "./Gallery";
import { Tag } from "./Tag";

@ObjectType({ implements: [DescEntry, Entry] })
@Entity("shopitems")
@Check('"price" > 0')
@Check('"available_to" IS NULL OR "available_to" > CURRENT_TIMESTAMP')
export class ShopItem extends DescEntry {
    @Field(type => Float)
    @Column("decimal")
    price: number
    @Field()
    @Column({ type: "boolean", default: true })
    hide: boolean
    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    available_from: Date
    @Field(type => Date, { nullable: true })
    @Column({ type: "timestamptz", nullable: true })
    available_to?: Date
    @Field(type => Category, { nullable: true })
    @ManyToOne(() => Category, (category) => category.shop_items, { nullable: true })
    category?: Category | null
    @Field(type => [FileData], { nullable: "itemsAndList" })
    @ArrayNotEmpty()
    @ValidateIf(p => !p.galleries || p.galleries.length == 0)
    @ManyToMany((type) => FileData, (file) => file.shop_items)
    @JoinTable()
    files: FileData[]
    @Field(type => [Gallery], { nullable: "itemsAndList" })
    @ArrayNotEmpty()
    @ValidateIf(p => !p.files || p.files.length == 0)
    @ManyToMany((type) => Gallery, (gallery) => gallery.shop_items)
    @JoinTable()
    galleries: Gallery[]
}
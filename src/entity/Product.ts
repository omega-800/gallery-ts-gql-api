import { Check, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { DescEntry, Entry } from "./Entry";
import { File } from "./File";
import { Gallery } from "./Gallery";
import { Tag } from "./Tag";
import { IsNotEmpty, ValidateIf } from "class-validator";
import { ShopItem } from "./ShopItem";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ implements: [DescEntry, Entry] })
@Entity("products")
//@Check("(fileId IS NULL) != (galleryId IS NULL)")
export class Product extends DescEntry {
    @Field(type => File, { nullable: true })
    @OneToOne((type) => File, (file) => file.product, { nullable: true })
    @JoinColumn()
    @IsNotEmpty()
    @ValidateIf(p => !p.gallery)
    file?: File | null
    @Field(type => Gallery, { nullable: true })
    @OneToOne((type) => Gallery, (gallery) => gallery.product, { nullable: true })
    @JoinColumn()
    @IsNotEmpty()
    @ValidateIf(p => !p.file)
    gallery?: Gallery | null
    @Field(type => [Tag], { nullable: "itemsAndList" })
    @ManyToMany(() => Tag, (tag) => tag.products)
    @JoinTable()
    tags: Tag[]
    @Field(type => [ShopItem], { nullable: "itemsAndList" })
    @ManyToMany(() => ShopItem, (shop_item) => shop_item.products)
    shop_items: ShopItem[]
}
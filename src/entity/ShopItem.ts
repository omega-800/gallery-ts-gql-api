import { Entity, Column, ManyToOne, JoinTable, ManyToMany, Check } from "typeorm";
import { DescEntry, Entry } from "./Entry";
import { Category } from "./Category";
import { Product } from "./Product";
import { Field, Float, ObjectType } from "type-graphql";

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
    available_to?: Date | null
    @Field(type => Category, { nullable: true })
    @ManyToOne(() => Category, (category) => category.shop_items, { nullable: true })
    category?: Category | null
    @Field(type => [Product])
    @ManyToMany(() => Product, (product) => product.shop_items)
    @JoinTable()
    products: Product[]
}
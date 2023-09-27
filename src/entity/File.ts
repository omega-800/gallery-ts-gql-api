import { Entity, Column, Check, TableInheritance, ChildEntity, JoinTable, ManyToMany, JoinColumn, OneToOne } from 'typeorm'
import { Tag } from './Tag';
import { NamedEntry, Entry } from './Entry';
import { Gallery } from './Gallery';
import { ShopItem } from './ShopItem';
import { InterfaceType, Field, ObjectType, Int, Float } from 'type-graphql';

@InterfaceType({ implements: [NamedEntry, Entry] })
@Entity("files")
@TableInheritance({ column: { type: "varchar", name: "type" } })
//@Check("(type = 'Image' AND file_type IN ('png', 'jpg', 'jpeg', 'gif', 'avif', 'webp')) OR (type = 'Video' AND file_type IN ('mp4', 'mov'))")
export abstract class FileData extends NamedEntry {
    /*@Field()
    @Column({ type: "varchar" })
    url: string
    @Field()
    @Column({ type: "varchar" })
    preview_url: string*/
    @Field()
    @Column({ type: "varchar" })
    file_type: string
    @Field()
    @Column({ type: "varchar" })
    file_name: string
    @Field()
    @Column({ type: "varchar" })
    file_name_orig: string
    @Field(type => Float)
    @Column("decimal")
    size: number //in bytes
    @Field(type => Int)
    @Column("integer")
    width: number
    @Field(type => Int)
    @Column("integer")
    height: number
    @Field(type => Int)
    @Column("integer")
    width_prev: number
    @Field(type => Int)
    @Column("integer")
    height_prev: number
    @Field()
    @Column({ default: false })
    edited: boolean
    @Field()
    @Column({ default: false })
    favorite: boolean
    @Field(type => [Gallery], { nullable: "itemsAndList" })
    @ManyToMany(() => Gallery, (gallery) => gallery.files)
    galleries: Gallery[];
    @Field(type => [Tag], { nullable: "itemsAndList" })
    @ManyToMany(() => Tag, (tag) => tag.files)
    tags: Tag[]
    @Field(type => [ShopItem], { nullable: "itemsAndList" })
    @ManyToMany(() => ShopItem, (shop_item) => shop_item.files)
    shop_items: ShopItem[]
}

@ObjectType({ implements: [FileData, NamedEntry, Entry] })
@ChildEntity()
export class Image extends FileData {
    @Field(type => String, { nullable: true })
    @Column({ type: "varchar", nullable: true })
    alt?: string | null
}

@ObjectType({ implements: [FileData, NamedEntry, Entry] })
@ChildEntity()
export class Video extends FileData {
    @Field(type => Float)
    @Column("decimal")
    duration: number //in seconds
    @Field(type => Float)
    @Column("decimal")
    fps: number
    @Field(type => Float)
    @Column("decimal")
    fps_prev: number
}
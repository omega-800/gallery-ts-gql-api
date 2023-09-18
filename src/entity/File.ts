import { Entity, Column, Check, TableInheritance, ChildEntity, JoinTable, ManyToMany, JoinColumn, OneToOne } from 'typeorm'
import { IPostgresInterval } from 'postgres-interval';
import { NamedEntry, Entry } from './Entry';
import { Gallery } from './Gallery';
import { Product } from './Product';
import { InterfaceType, Field, ObjectType, Int } from 'type-graphql';

@InterfaceType({ implements: [NamedEntry, Entry] })
@Entity("files")
@TableInheritance({ column: { type: "varchar", name: "type" } })
@Check("(type = 'Image' AND file_type IN ('png', 'jpg', 'gif', 'avif', 'webp')) OR (type = 'Video' AND file_type IN ('png', 'jpg', 'gif', 'avif', 'webp'))")
export abstract class File extends NamedEntry {
    @Field()
    @Column({ type: "varchar" })
    url: string
    @Field()
    @Column({ type: "varchar" })
    preview_url: string
    @Field()
    @Column({ type: "varchar" })
    file_type: string
    @Field()
    @Column({ type: "varchar" })
    file_name: string
    @Field(type => Int)
    @Column("integer")
    width: number
    @Field(type => Int)
    @Column("integer")
    height: number
    @Field(type => [Gallery], { nullable: "itemsAndList" })
    @ManyToMany(() => Gallery, (gallery) => gallery.files)
    galleries: Gallery[];
    @Field(type => Product, { nullable: true })
    @OneToOne((type) => Product, (product) => product.file, { nullable: true })
    product?: Product | null
}

@ObjectType({ implements: [File, NamedEntry, Entry] })
@ChildEntity()
export class Image extends File {
    @Field(type => String, { nullable: true })
    @Column({ type: "varchar", nullable: true })
    alt?: string | null
}

@ObjectType({ implements: [File, NamedEntry, Entry] })
@ChildEntity()
export class Video extends File {
    @Field(type => String, { nullable: true })
    @Column({ type: "interval", nullable: true })
    duration?: IPostgresInterval | null
}
import { Field, ID, InterfaceType } from "type-graphql"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@InterfaceType()
export abstract class Entry {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    date_added: Date
    @Field()
    @UpdateDateColumn({ type: "timestamptz" })
    date_updated: Date
    @Field()
    @DeleteDateColumn({ type: "timestamptz" })
    date_deleted: Date
}

@InterfaceType(/* { implements: Entry } */)
export abstract class NamedEntry extends Entry {
    @Field(type => String, { nullable: true })
    @Column({ type: "varchar", nullable: true, length: 200 })
    name?: string | null
}

@InterfaceType(/* { implements: Entry } */)
export abstract class DescEntry extends Entry {
    @Field()
    @Column({ type: "varchar", length: 200 })
    name: string
    @Field(type => String, { nullable: true })
    @Column({ type: "text", nullable: true })
    description?: string | null
}

@InterfaceType(/* { implements: Entry } */)
export abstract class StrictNamedEntry extends Entry {
    @Field()
    @Column({ type: "varchar", length: 200, unique: true })
    name: string
    @Field(type => String, { nullable: true })
    @Column({ type: "text", nullable: true })
    description?: string | null
}
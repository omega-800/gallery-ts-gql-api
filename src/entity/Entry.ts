import { Field, ID, InterfaceType } from "type-graphql"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@InterfaceType()
export abstract class Entry {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Field(type => Date)
    @CreateDateColumn({ type: "timestamptz" })
    date_added: Date
    @Field(type => Date)
    @UpdateDateColumn({ type: "timestamptz" })
    date_updated: Date
    @Field(type => Date, { nullable: true })
    @DeleteDateColumn({ type: "timestamptz", nullable: true })
    date_deleted?: Date | null
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
export abstract class UniqueNamedEntry extends Entry {
    @Field()
    @Column({ type: "varchar", length: 200, unique: true })
    name: string
    @Field(type => String, { nullable: true })
    @Column({ type: "text", nullable: true })
    description?: string | null
}
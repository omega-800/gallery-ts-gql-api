import { Entity, JoinTable, ManyToMany } from "typeorm";
import { UniqueNamedEntry, Entry } from "./Entry";
import { FileData } from "./File";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ implements: [UniqueNamedEntry, Entry] })
@Entity("tags")
export class Tag extends UniqueNamedEntry {
    @Field(type => [FileData], { nullable: "itemsAndList" })
    @ManyToMany(() => FileData, (file) => file.tags)
    @JoinTable()
    files: FileData[]
}
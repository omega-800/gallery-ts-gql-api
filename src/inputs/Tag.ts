import { MaxLength } from "class-validator"
import { InputType, Field, ID } from "type-graphql"

@InputType()
export class CreateTagInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    file_ids: string[]
}

@InputType()
export class AlterTagInput {
    @Field(() => ID)
    id: string
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    file_ids: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
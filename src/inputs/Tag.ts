import { MaxLength } from "class-validator"
import { InputType, Field } from "type-graphql"

@InputType()
export class CreateTagInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    description?: string | null
    @Field(type => [String], { nullable: "itemsAndList" })
    product_ids: string[]
}
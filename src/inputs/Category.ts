import { MaxLength } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class CreateCategoryInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    description?: string | null
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
}
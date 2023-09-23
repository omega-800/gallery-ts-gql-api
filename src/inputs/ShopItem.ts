import { MaxLength } from "class-validator"
import { Field, Float, InputType } from "type-graphql"

@InputType()
export class CreateShopItemInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    description?: string | null
    @Field(type => Float)
    price: number
    @Field(type => Boolean, { nullable: true })
    hide?: boolean
    @Field(type => Date, { nullable: true })
    available_from?: Date
    @Field(type => Date, { nullable: true })
    available_to?: Date
    @Field(type => String, { nullable: true })
    category_id?: string | null
    @Field(type => [String])
    product_ids: string[]
}
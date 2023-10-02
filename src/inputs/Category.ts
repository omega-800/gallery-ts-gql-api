import { Matches, MaxLength } from "class-validator"
import { Field, ID, InputType } from "type-graphql"

@InputType()
export class CreateCategoryInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    @MaxLength(22)
    @Matches(/^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$/, {
        message:
            'Color must be in HEX ARBG format #[ffaa11|fa1|ffaa1155|fa15',
    })
    color?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
@InputType()
export class AlterCategoryInput {
    @Field(() => ID)
    id: string
    @Field()
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    @MaxLength(22)
    @Matches(/^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$/, {
        message:
            'Color must be in HEX ARBG format #[ffaa11|fa1|ffaa1155|fa15',
    })
    color?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
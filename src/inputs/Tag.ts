import { Matches, MaxLength } from "class-validator"
import { InputType, Field, ID } from "type-graphql"

@InputType()
export class CreateTagInput {
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
    @MaxLength(22)
    @Matches(/^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$/, {
        message:
            'Color must be in HEX ARBG format #[ffaa11|fa1|ffaa1155|fa15',
    })
    color?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    file_ids: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
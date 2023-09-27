import { ArrayNotEmpty, IsNotEmpty, MaxLength, ValidateIf } from "class-validator"
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
    @Field(type => [String], { nullable: "itemsAndList" })
    @ArrayNotEmpty()
    @ValidateIf(p => !p.gallery_ids || p.gallery_ids.length == 0)
    file_ids?: string[] | null
    @Field(type => [String], { nullable: "itemsAndList" })
    @ArrayNotEmpty()
    @ValidateIf(p => !p.file_ids || p.file_ids.length == 0)
    gallery_ids?: string[] | null
}
import { ArrayNotEmpty, IsNotEmpty, MaxLength, ValidateIf } from "class-validator"
import { Field, Float, ID, InputType } from "type-graphql"

@InputType()
export class CreateShopItemInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => Float)
    price: number
    @Field(type => Boolean, { nullable: true })
    hide?: boolean
    @Field(type => Date, { nullable: true })
    available_from?: Date
    @Field(type => Date, { nullable: true })
    available_to?: Date
    @Field(type => String, { nullable: true })
    category_id?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    @ArrayNotEmpty()
    @ValidateIf(p => !p.gallery_ids || p.gallery_ids.length == 0)
    file_ids?: string[]
    @Field(type => [String], { nullable: "itemsAndList" })
    @ArrayNotEmpty()
    @ValidateIf(p => !p.file_ids || p.file_ids.length == 0)
    gallery_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
@InputType()
export class AlterShopItemInput {
    @Field(() => ID)
    id: string
    @Field({ nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => Float, { nullable: true })
    price?: number
    @Field(type => Boolean, { nullable: true })
    hide?: boolean
    @Field(type => Date, { nullable: true })
    available_from?: Date
    @Field(type => Date, { nullable: true })
    available_to?: Date
    @Field(type => String, { nullable: true })
    category_id?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    file_ids?: string[]
    @Field(type => [String], { nullable: "itemsAndList" })
    gallery_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
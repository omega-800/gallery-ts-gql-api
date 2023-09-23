import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator"
import { InputType, Field } from "type-graphql"

@InputType()
export class CreateProductInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => String, { nullable: true })
    description?: string | null
    @Field(type => String, { nullable: true })
    @IsNotEmpty()
    @ValidateIf(p => !p.gallery_id)
    file_id?: string | null
    @Field(type => String, { nullable: true })
    @IsNotEmpty()
    @ValidateIf(p => !p.file_id)
    gallery_id?: string | null
    @Field(type => [String], { nullable: "itemsAndList" })
    tag_ids?: string[]
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
}
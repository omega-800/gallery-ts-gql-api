import { MaxLength } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateGalleryInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => [String])
    file_ids: string[];
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
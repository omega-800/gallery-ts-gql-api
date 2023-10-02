import { MaxLength } from "class-validator";
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class CreateGalleryInput {
    @Field()
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String])
    file_ids: string[];
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}

@InputType()
export class AlterGalleryInput {
    @Field(() => ID)
    id: string
    @Field({ nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    description?: string
    @Field(type => [String], { nullable: "itemsAndList" })
    file_ids?: string[];
    @Field(type => [String], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
}
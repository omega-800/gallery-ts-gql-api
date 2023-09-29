import { InputType, Field, Int, ID, Float } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class CreateImageInput {
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    alt?: string
    /*@Field()
    url: string
    @Field()
    preview_url: string*/
    @Field()
    file_type: string
    @Field()
    file_name: string
    @Field()
    file_name_orig: string
    @Field(type => Float)
    size: number
    @Field(type => Int)
    width: number
    @Field(type => Int)
    height: number
    @Field(type => Int)
    width_prev: number
    @Field(type => Int)
    height_prev: number
    @Field(type => Boolean, { nullable: true })
    edited?: boolean
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
    @Field(type => [ID], { nullable: "itemsAndList" })
    gallery_ids?: string[];
    @Field(type => [ID], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => [ID], { nullable: "itemsAndList" })
    tag_ids?: string[]
}

@InputType()
export class AlterImageInput {
    @Field(() => ID)
    id: string
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => String, { nullable: true })
    alt?: string
    @Field(type => Boolean, { nullable: true })
    edited?: boolean
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
    @Field(type => [ID], { nullable: "itemsAndList" })
    gallery_ids?: string[];
    @Field(type => [ID], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => [ID], { nullable: "itemsAndList" })
    tag_ids?: string[]
}

@InputType()
export class CreateVideoInput {
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => Float)
    duration: number
    /*@Field()
    url: string
    @Field()
    preview_url: string*/
    @Field()
    file_type: string
    @Field()
    file_name: string
    @Field()
    file_name_orig: string
    @Field(type => Float)
    size: number
    @Field(type => Int)
    width: number
    @Field(type => Int)
    height: number
    @Field(type => Int)
    width_prev: number
    @Field(type => Int)
    height_prev: number
    @Field(type => Float)
    fps: number
    @Field(type => Float)
    fps_prev: number
    @Field(type => Boolean, { nullable: true })
    edited?: boolean
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
    @Field(type => [ID], { nullable: "itemsAndList" })
    gallery_ids?: string[];
    @Field(type => [ID], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => [ID], { nullable: "itemsAndList" })
    tag_ids?: string[]
}

@InputType()
export class AlterVideoInput {
    @Field(() => ID)
    id: string
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string
    @Field(type => Boolean, { nullable: true })
    edited?: boolean
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean
    @Field(type => [ID], { nullable: "itemsAndList" })
    gallery_ids?: string[];
    @Field(type => [ID], { nullable: "itemsAndList" })
    shop_item_ids?: string[]
    @Field(type => [ID], { nullable: "itemsAndList" })
    tag_ids?: string[]
}
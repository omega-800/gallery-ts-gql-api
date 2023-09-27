import { InputType, Field, Int, ID, Float } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class CreateImageInput {
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string | null
    @Field(type => String, { nullable: true })
    alt?: string | null
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
    edited?: boolean | null
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean | null
    @Field(type => [ID], { nullable: "itemsAndList" })
    gallery_ids?: string[] | null;
    @Field(type => [ID], { nullable: "itemsAndList" })
    shop_item_ids?: string[] | null
    @Field(type => [ID], { nullable: "itemsAndList" })
    tag_ids?: string[] | null
}

@InputType()
export class CreateVideoInput {
    @Field(type => String, { nullable: true })
    @MaxLength(200)
    name?: string | null
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
    edited?: boolean | null
    @Field(type => Boolean, { nullable: true })
    favorite?: boolean | null
    @Field(type => [ID], { nullable: "itemsAndList" })
    gallery_ids?: string[] | null;
    @Field(type => [ID], { nullable: "itemsAndList" })
    shop_item_ids?: string[] | null
    @Field(type => [ID], { nullable: "itemsAndList" })
    tag_ids?: string[] | null
}
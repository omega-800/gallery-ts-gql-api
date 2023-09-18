import { InputType, Field, Int } from "type-graphql";
import { Gallery } from "../entity/Gallery";
import { Product } from "../entity/Product";
import { IPostgresInterval } from 'postgres-interval';

/*
@InputType()
export class CreateFileInput {
    @Field(type => String, { nullable: true })
    name?: string | null
    @Field()
    url: string
    @Field()
    preview_url: string
    @Field()
    file_type: string
    @Field()
    file_name: string
    @Field(type => Int)
    width: number
    @Field(type => Int)
    height: number
    @Field(type => [Gallery], { nullable: "itemsAndList" })
    galleries?: Gallery[] | null;
    @Field(type => Product, { nullable: true })
    product?: Product | null 
}*/

@InputType()
export class CreateImageInput {
    @Field(type => String, { nullable: true })
    name?: string | null
    @Field(type => String, { nullable: true })
    alt?: string | null
    @Field()
    url: string
    @Field()
    preview_url: string
    @Field()
    file_type: string
    @Field()
    file_name: string
    @Field(type => Int)
    width: number
    @Field(type => Int)
    height: number
    /* @Field(type => [Gallery], { nullable: "itemsAndList" })
    galleries?: Gallery[] | null;
    @Field(type => Product, { nullable: true })
    product?: Product | null */
}

@InputType()
export class CreateVideoInput {
    @Field(type => String, { nullable: true })
    name?: string | null
    @Field(type => String, { nullable: true })
    duration?: IPostgresInterval | null
    @Field()
    url: string
    @Field()
    preview_url: string
    @Field()
    file_type: string
    @Field()
    file_name: string
    @Field(type => Int)
    width: number
    @Field(type => Int)
    height: number
    /* @Field(type => [Gallery], { nullable: "itemsAndList" })
    galleries?: Gallery[] | null;
    @Field(type => Product, { nullable: true })
    product?: Product | null */
}
import { MaxLength } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateGalleryInput {
    @Field()
    @MaxLength(200)
    name: string
    @Field(type => [String])
    file_ids: string[];
    @Field(type => String, { nullable: true })
    product_id?: string | null
}
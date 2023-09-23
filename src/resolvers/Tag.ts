import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { CreateTagInput } from "../inputs/Tag";
import { Product } from "../entity/Product";

const relationsAll = { relations: { products: true } }

@Resolver(of => Tag)
class TagResolver {
    @Query(() => Tag)
    async tag(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Tag).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Tag])
    async tags() {
        return await AppDataSource.getRepository(Tag).find(relationsAll);
    }
    @Mutation(() => Tag)
    async create_tag(@Arg("data") data: CreateTagInput) {
        let repo = AppDataSource.getRepository(Tag);
        let products: Product[] = [];
        data.product_ids?.forEach(async id => {
            let product = await AppDataSource.getRepository(Product).findOne({ where: { id } })
            if (product) products.push(product)
        })

        const tag = repo.create({ ...data, products: products });
        await repo.save(tag);
        return tag;
    }
}


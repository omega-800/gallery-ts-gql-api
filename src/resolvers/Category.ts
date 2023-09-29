import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { ShopItem } from "../entity/ShopItem";
import { CreateCategoryInput } from "../inputs/Category";

const relationsAll = { relations: { shop_items: true }, withDeleted: true }

@Resolver(of => Category)
class CategoryResolver {
    @Query(() => Category)
    async category(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Category).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Category])
    async categories() {
        return await AppDataSource.getRepository(Category).find(relationsAll);
    }
    @Mutation(() => Category)
    async create_category(@Arg("data") data: CreateCategoryInput) {
        let repo = AppDataSource.getRepository(Category);

        let shop_items: ShopItem[] = [];
        data.shop_item_ids?.forEach(async id => {
            let shop_item = await AppDataSource.getRepository(ShopItem).findOne({ where: { id } })
            if (shop_item) shop_items.push(shop_item)
        })

        const category = repo.create({ ...data, shop_items: shop_items });
        await repo.save(category);
        return category;
    }
}


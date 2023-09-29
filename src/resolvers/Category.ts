import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource, defOrder } from "../data-source";
import { Category } from "../entity/Category";
import { ShopItem } from "../entity/ShopItem";
import { CreateCategoryInput } from "../inputs/Category";
import { In } from "typeorm";

const relationsAll = { relations: { shop_items: true }, withDeleted: true }

@Resolver(of => Category)
class CategoryResolver {
    @Query(() => Category)
    async category(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Category).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Category])
    async categories() {
        return await AppDataSource.getRepository(Category).find({ ...relationsAll, ...defOrder });
    }
    @Mutation(() => Category)
    async create_category(@Arg("data") data: CreateCategoryInput) {
        const repo = AppDataSource.getRepository(Category);

        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];

        const category = repo.create({ ...data, shop_items: shop_items });
        await repo.save(category);
        return category;
    }
}


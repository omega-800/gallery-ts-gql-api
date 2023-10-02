import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource, defOrder } from "../data-source";
import { Category } from "../entity/Category";
import { ShopItem } from "../entity/ShopItem";
import { AlterCategoryInput, CreateCategoryInput } from "../inputs/Category";
import { In } from "typeorm";

const relationsAll = { relations: { shop_items: true }, withDeleted: true }

@Resolver(of => Category)
class CategoryResolver {
    @Query(() => Boolean)
    async category_name_exists(@Arg("name") name: string) {
        return await AppDataSource.getRepository(Category).exist({ where: { name } })
    }
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
    @Mutation(() => Category)
    async delete_category(@Arg("id") id: string) {
        await AppDataSource.getRepository(Category).softDelete(id)
        return this.category(id);
    }
    @Mutation(() => Category)
    async restore_category(@Arg("id") id: string) {
        await AppDataSource.getRepository(Category).restore(id)
        return this.category(id);
    }
    @Mutation(() => Category)
    async alter_category(@Arg("data") data: AlterCategoryInput) {
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];
        //await AppDataSource.getRepository(Category).update({ id }, { favorite })
        await AppDataSource.getRepository(Category).save({ ...data, shop_items: shop_items })
        return this.category(data.id);
    }
}


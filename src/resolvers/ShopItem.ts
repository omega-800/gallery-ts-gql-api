import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { ShopItem } from "../entity/ShopItem";
import { validate } from "class-validator";
import { CreateShopItemInput } from "../inputs/ShopItem";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";

const relationsAll = { relations: { products: true, category: true } }

@Resolver(of => ShopItem)
class ShopItemResolver {
    @Query(() => ShopItem)
    async shop_item(@Arg("id") id: string) {
        return await AppDataSource.getRepository(ShopItem).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [ShopItem])
    async shop_items() {
        return await AppDataSource.getRepository(ShopItem).find(relationsAll);
    }
    @Mutation(() => ShopItem)
    async create_shop_item(@Arg("data") data: CreateShopItemInput) {
        let repo = AppDataSource.getRepository(ShopItem);

        const data_clone = Object.assign(Object.create(Object.getPrototypeOf(data)), data)
        let errors = await validate(data_clone, { whitelist: true })
        if (errors.length > 0) {
            console.log(errors)
            return errors
        }

        let products: Product[] = [];
        data.product_ids?.forEach(async id => {
            let product = await AppDataSource.getRepository(Product).findOne({ where: { id } })
            if (product) products.push(product)
        })

        let category;
        if (data.category_id) category = await AppDataSource.getRepository(Category).findOne({ where: { id: data.category_id } })

        const shop_item = repo.create({ ...data, category: category, products: products });
        await repo.save(shop_item);
        return shop_item;
    }
}


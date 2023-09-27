import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { ShopItem } from "../entity/ShopItem";
import { validate } from "class-validator";
import { CreateShopItemInput } from "../inputs/ShopItem";
import { Category } from "../entity/Category";
import { FileData } from "../entity/File";
import { Gallery } from "../entity/Gallery";

const relationsAll = { relations: { files: true, galleries: true, category: true } }

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

        let galleries: Gallery[] = [];
        data.gallery_ids?.forEach(async id => {
            let gallery = await AppDataSource.getRepository(Gallery).findOne({ where: { id } })
            if (gallery) galleries.push(gallery)
        })

        let files: FileData[] = [];
        data.file_ids?.forEach(async id => {
            let file = await AppDataSource.getRepository(FileData).findOne({ where: { id } })
            if (file) files.push(file)
        })

        let category;
        if (data.category_id) category = await AppDataSource.getRepository(Category).findOne({ where: { id: data.category_id } })

        const shop_item = repo.create({ ...data, category: category, files: files, galleries: galleries });
        await repo.save(shop_item);
        return shop_item;
    }
}


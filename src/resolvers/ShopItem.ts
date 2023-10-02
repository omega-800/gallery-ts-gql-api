import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource, defOrder, } from "../data-source";
import { ShopItem } from "../entity/ShopItem";
import { validate } from "class-validator";
import { AlterShopItemInput, CreateShopItemInput } from "../inputs/ShopItem";
import { Category } from "../entity/Category";
import { FileData } from "../entity/File";
import { Gallery } from "../entity/Gallery";
import { FindOptionsOrderValue, In } from "typeorm";

const relationsAll = { relations: { files: true, galleries: true, category: true }, withDeleted: true }
@Resolver(of => ShopItem)
class ShopItemResolver {
    @Query(() => ShopItem)
    async shop_item(@Arg("id") id: string) {
        return await AppDataSource.getRepository(ShopItem).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [ShopItem])
    async shop_items() {
        return await AppDataSource.getRepository(ShopItem).find({ ...relationsAll, ...defOrder });
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

        const galleries: Gallery[] = data.gallery_ids ? await AppDataSource.getRepository(Gallery).find({ where: { id: In(data.gallery_ids) }, ...defOrder }) : [];
        const files: FileData[] = data.file_ids ? await AppDataSource.getRepository(FileData).find({ where: { id: In(data.file_ids) }, ...defOrder }) : [];

        let category;
        if (data.category_id) category = await AppDataSource.getRepository(Category).findOne({ where: { id: data.category_id } })

        const shop_item = repo.create({ ...data, category: category, files: files, galleries: galleries });
        await repo.save(shop_item);
        return shop_item;
    }
    @Mutation(() => ShopItem)
    async delete_shop_item(@Arg("id") id: string) {
        await AppDataSource.getRepository(ShopItem).softDelete(id)
        return this.shop_item(id);
    }
    @Mutation(() => ShopItem)
    async restore_shop_item(@Arg("id") id: string) {
        await AppDataSource.getRepository(ShopItem).restore(id)
        return this.shop_item(id);
    }
    @Mutation(() => ShopItem)
    async alter_shop_item(@Arg("data") data: AlterShopItemInput) {
        const galleries: Gallery[] = data.gallery_ids ? await AppDataSource.getRepository(Gallery).find({ where: { id: In(data.gallery_ids) }, ...defOrder }) : [];
        const files: FileData[] = data.file_ids ? await AppDataSource.getRepository(FileData).find({ where: { id: In(data.file_ids) }, ...defOrder }) : [];
        let category;
        if (data.category_id) category = await AppDataSource.getRepository(Category).findOne({ where: { id: data.category_id } })

        await AppDataSource.getRepository(ShopItem).save({ ...data, category: category, files: files, galleries: galleries })
        return this.shop_item(data.id);
    }
}


import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { CreateProductInput } from "../inputs/Product";
import { FileData } from "../entity/File";
import { Gallery } from "../entity/Gallery";
import { Tag } from "../entity/Tag";
import { ShopItem } from "../entity/ShopItem";
import { validate } from "class-validator";

const relationsAll = { relations: { file: true, gallery: true, tags: true, shop_items: true } }

@Resolver(of => Product)
class ProductResolver {
    @Query(() => Product)
    async product(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Product).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Product])
    async products() {
        return await AppDataSource.getRepository(Product).find(relationsAll);
    }
    @Mutation(() => Product)
    async create_product(@Arg("data") data: CreateProductInput) {
        let repo = AppDataSource.getRepository(Product);

        const data_clone = Object.assign(Object.create(Object.getPrototypeOf(data)), data)
        let errors = await validate(data_clone, { whitelist: true })
        if (errors.length > 0) {
            console.log(errors)
            return errors
        }
        let tags: Tag[] = [];
        data.tag_ids?.forEach(async id => {
            let tag = await AppDataSource.getRepository(Tag).findOne({ where: { id } })
            if (tag) tags.push(tag)
        })

        let shop_items: ShopItem[] = [];
        data.shop_item_ids?.forEach(async id => {
            let shop_item = await AppDataSource.getRepository(ShopItem).findOne({ where: { id } })
            if (shop_item) shop_items.push(shop_item)
        })

        let file;
        if (data.file_id) file = await AppDataSource.getRepository(FileData).findOne({ where: { id: data.file_id } })
        let gallery;
        if (data.gallery_id) gallery = await AppDataSource.getRepository(Gallery).findOne({ where: { id: data.gallery_id } })

        const product = repo.create({ ...data, file: file, gallery: gallery, shop_items: shop_items, tags: tags });
        await repo.save(product);
        return product;
    }
}


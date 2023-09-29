import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Gallery } from "../entity/Gallery";
import { CreateGalleryInput } from "../inputs/Gallery";
import { FileData } from "../entity/File";
import { ShopItem } from "../entity/ShopItem";

const relationsAll = { relations: { files: true, shop_items: true }, withDeleted: true }

@Resolver(of => Gallery)
class GalleryResolver {
    @Query(() => Gallery)
    async gallery(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Gallery).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Gallery])
    async galleries() {
        return await AppDataSource.getRepository(Gallery).find(relationsAll);
    }
    @Mutation(() => Gallery)
    async create_gallery(@Arg("data") data: CreateGalleryInput) {
        let repo = AppDataSource.getRepository(Gallery);
        let files: FileData[] = [];
        data.file_ids.forEach(async id => {
            let file = await AppDataSource.getRepository(FileData).findOne({ where: { id } })
            if (file) files.push(file)
        })
        let shop_items: ShopItem[] = [];
        data.shop_item_ids?.forEach(async id => {
            let shop_item = await AppDataSource.getRepository(ShopItem).findOne({ where: { id } })
            if (shop_item) shop_items.push(shop_item)
        })

        const gallery = repo.create({ ...data, files: files, shop_items: shop_items });
        await repo.save(gallery);
        return gallery;
    }
}

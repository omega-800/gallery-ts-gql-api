import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource, defOrder } from "../data-source";
import { Gallery } from "../entity/Gallery";
import { AlterGalleryInput, CreateGalleryInput } from "../inputs/Gallery";
import { FileData, Image, Video } from "../entity/File";
import { ShopItem } from "../entity/ShopItem";
import { In } from "typeorm";

const relationsAll = { relations: { files: true, shop_items: true }, withDeleted: true }

@Resolver(of => Gallery)
class GalleryResolver {
    @Query(() => Gallery)
    async gallery(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Gallery).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Gallery])
    async galleries() {
        return await AppDataSource.getRepository(Gallery).find({ ...relationsAll, ...defOrder });
    }
    @Mutation(() => Gallery)
    async create_gallery(@Arg("data") data: CreateGalleryInput) {
        let repo = AppDataSource.getRepository(Gallery);

        const files: FileData[] = data.file_ids ? await AppDataSource.getRepository(FileData).find({ where: { id: In(data.file_ids) }, ...defOrder }) : [];
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];

        const gallery = repo.create({ ...data, files: files, shop_items: shop_items });
        await repo.save(gallery);
        return gallery;
    }
    @Mutation(() => Gallery)
    async delete_gallery(@Arg("id") id: string) {
        await AppDataSource.getRepository(Gallery).softDelete(id)
        return this.gallery(id);
    }
    @Mutation(() => Gallery)
    async restore_gallery(@Arg("id") id: string) {
        await AppDataSource.getRepository(Gallery).restore(id)
        return this.gallery(id);
    }
    @Mutation(() => Gallery)
    async alter_gallery(@Arg("data") data: AlterGalleryInput) {
        const files: FileData[] = data.file_ids ? await AppDataSource.getRepository(FileData).find({ where: { id: In(data.file_ids) }, ...defOrder }) : [];
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];
        await AppDataSource.getRepository(Gallery).save({ ...data, files: files, shop_items: shop_items })
        return this.gallery(data.id);
    }
}

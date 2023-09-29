import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FileData, Image, Video } from "../entity/File";
import { AppDataSource, defOrder } from "../data-source";
import { AlterImageInput, AlterVideoInput, CreateImageInput, CreateVideoInput } from "../inputs/File";
import { Gallery } from "../entity/Gallery";
import { ShopItem } from "../entity/ShopItem";
import { Tag } from "../entity/Tag";
import { In } from "typeorm";

const relationsAll = { relations: { galleries: true, tags: true, shop_items: true }, withDeleted: true }

@Resolver(of => FileData)
class FileResolver {
    @Query(() => FileData)
    async file(@Arg("id") id: string) {
        return await AppDataSource.getRepository(FileData).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [FileData])
    async files() {
        return await AppDataSource.getRepository(FileData).find({ ...relationsAll, ...defOrder });
    }
    @Query(() => [Image])
    async images() {
        return await AppDataSource.getRepository(Image).find({ ...relationsAll, ...defOrder });
    }
    @Query(() => [Video])
    async videos() {
        return await AppDataSource.getRepository(Video).find({ ...relationsAll, ...defOrder });
    }
    @Mutation(() => Image)
    async create_image(@Arg("data") data: CreateImageInput) {
        const repo = AppDataSource.getRepository(Image);

        const galleries: Gallery[] = data.gallery_ids ? await AppDataSource.getRepository(Gallery).find({ where: { id: In(data.gallery_ids) }, ...defOrder }) : [];
        const tags: Tag[] = data.tag_ids ? await AppDataSource.getRepository(Tag).find({ where: { id: In(data.tag_ids) }, ...defOrder }) : [];
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];

        const image = repo.create({ ...data, galleries: galleries, tags: tags, shop_items: shop_items, });
        await repo.save(image);
        return image;
    }
    @Mutation(() => Video)
    async create_video(@Arg("data") data: CreateVideoInput) {
        const repo = AppDataSource.getRepository(Video);

        const galleries: Gallery[] = data.gallery_ids ? await AppDataSource.getRepository(Gallery).find({ where: { id: In(data.gallery_ids) }, ...defOrder }) : [];
        const tags: Tag[] = data.tag_ids ? await AppDataSource.getRepository(Tag).find({ where: { id: In(data.tag_ids) }, ...defOrder }) : [];
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];

        const video = repo.create({ ...data, galleries: galleries, tags: tags, shop_items: shop_items });
        await repo.save(video);
        return video;
    }
    @Mutation(() => FileData)
    async delete_file(@Arg("id") id: string) {
        await AppDataSource.getRepository(FileData).softDelete(id)
        return this.file(id);
    }
    @Mutation(() => FileData)
    async restore_file(@Arg("id") id: string) {
        await AppDataSource.getRepository(FileData).restore(id)
        return this.file(id);
    }
    @Mutation(() => Image)
    async alter_image(@Arg("data") data: AlterImageInput) {
        const galleries: Gallery[] = data.gallery_ids ? await AppDataSource.getRepository(Gallery).find({ where: { id: In(data.gallery_ids) }, ...defOrder }) : [];
        const tags: Tag[] = data.tag_ids ? await AppDataSource.getRepository(Tag).find({ where: { id: In(data.tag_ids) }, ...defOrder }) : [];
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];
        //await AppDataSource.getRepository(FileData).update({ id }, { favorite })
        await AppDataSource.getRepository(Image).save({ ...data, galleries: galleries, tags: tags, shop_items: shop_items })
        return this.file(data.id);
    }
    @Mutation(() => Video)
    async alter_video(@Arg("data") data: AlterVideoInput) {
        const galleries: Gallery[] = data.gallery_ids ? await AppDataSource.getRepository(Gallery).find({ where: { id: In(data.gallery_ids) }, ...defOrder }) : [];
        const tags: Tag[] = data.tag_ids ? await AppDataSource.getRepository(Tag).find({ where: { id: In(data.tag_ids) }, ...defOrder }) : [];
        const shop_items: ShopItem[] = data.shop_item_ids ? await AppDataSource.getRepository(ShopItem).find({ where: { id: In(data.shop_item_ids) }, ...defOrder }) : [];
        //await AppDataSource.getRepository(FileData).update({ id }, { favorite })
        await AppDataSource.getRepository(Video).save({ ...data, galleries: galleries, tags: tags, shop_items: shop_items })
        return this.file(data.id);
    }
}

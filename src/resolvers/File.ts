import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FileData, Image, Video } from "../entity/File";
import { AppDataSource } from "../data-source";
import { AlterImageInput, AlterVideoInput, CreateImageInput, CreateVideoInput } from "../inputs/File";
import { Gallery } from "../entity/Gallery";
import { ShopItem } from "../entity/ShopItem";
import { Tag } from "../entity/Tag";

const relationsAll = { relations: { galleries: true, tags: true, shop_items: true }, withDeleted: true }

@Resolver(of => FileData)
class FileResolver {
    @Query(() => FileData)
    async file(@Arg("id") id: string) {
        return await AppDataSource.getRepository(FileData).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [FileData])
    async files() {
        return await AppDataSource.getRepository(FileData).find(relationsAll);
    }
    @Query(() => [Image])
    async images() {
        return await AppDataSource.getRepository(Image).find(relationsAll);
    }
    @Query(() => [Video])
    async videos() {
        return await AppDataSource.getRepository(Video).find(relationsAll);
    }
    @Mutation(() => Image)
    async create_image(@Arg("data") data: CreateImageInput) {
        let repo = AppDataSource.getRepository(Image);
        let galleries: Gallery[] = [];
        data.gallery_ids?.forEach(async id => {
            let gallery = await AppDataSource.getRepository(Gallery).findOne({ where: { id } })
            if (gallery) galleries.push(gallery)
        })
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

        const image = repo.create({ ...data, galleries: galleries, tags: tags, shop_items: shop_items, });
        await repo.save(image);
        return image;
    }
    @Mutation(() => Video)
    async create_video(@Arg("data") data: CreateVideoInput) {
        let repo = AppDataSource.getRepository(Video);
        let galleries: Gallery[] = [];
        data.gallery_ids?.forEach(async id => {
            let gallery = await AppDataSource.getRepository(Gallery).findOne({ where: { id } })
            if (gallery) galleries.push(gallery)
        })
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
        let galleries: Gallery[] = [];
        data.gallery_ids?.forEach(async id => {
            let gallery = await AppDataSource.getRepository(Gallery).findOne({ where: { id } })
            if (gallery) galleries.push(gallery)
        })
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
        //await AppDataSource.getRepository(FileData).update({ id }, { favorite })
        await AppDataSource.getRepository(Image).save({ ...data, galleries: galleries, tags: tags, shop_items: shop_items })
        return this.file(data.id);
    }
    @Mutation(() => Video)
    async alter_video(@Arg("data") data: AlterVideoInput) {
        let galleries: Gallery[] = [];
        data.gallery_ids?.forEach(async id => {
            let gallery = await AppDataSource.getRepository(Gallery).findOne({ where: { id } })
            if (gallery) galleries.push(gallery)
        })
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
        //await AppDataSource.getRepository(FileData).update({ id }, { favorite })
        await AppDataSource.getRepository(Video).save({ ...data, galleries: galleries, tags: tags, shop_items: shop_items })
        return this.file(data.id);
    }
}

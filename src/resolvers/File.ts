import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { FileData, Image, Video } from "../entity/File";
import { AppDataSource } from "../data-source";
import { CreateImageInput, CreateVideoInput } from "../inputs/File";
import { Gallery } from "../entity/Gallery";
import { Product } from "../entity/Product";

const relationsAll = { relations: { galleries: true, product: true } }

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
        let product;
        if (data.product_id) product = await AppDataSource.getRepository(Product).findOne({ where: { id: data.product_id } })
        const image = repo.create({ ...data, galleries: galleries, product: product });
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
        let product;
        if (data.product_id) product = await AppDataSource.getRepository(Product).findOne({ where: { id: data.product_id } })

        const video = repo.create({ ...data, galleries: galleries, product: product });
        await repo.save(video);
        return video;
    }
}

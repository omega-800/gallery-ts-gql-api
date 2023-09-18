import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { File, Image, Video } from "../entity/File";
import { AppDataSource } from "../data-source";
import { CreateImageInput, CreateVideoInput } from "../inputs/File";

@Resolver(of => File)
class FileResolver {
    @Query(() => File)
    async file(@Arg("id") id: string) {
        return await AppDataSource.getRepository(File).findOne({ where: { id } })
    }
    @Query(() => [File])
    async files() {
        return await AppDataSource.getRepository(File).find();
    }
    @Query(() => [Image])
    async images() {
        return await AppDataSource.getRepository(Image).find();
    }
    @Query(() => [Video])
    async videos() {
        return await AppDataSource.getRepository(Video).find();
    }
    @Mutation(() => Image)
    async create_image(@Arg("data") data: CreateImageInput) {
        let img_repo = AppDataSource.getRepository(Image);
        if (!!!data.name) data.name = data.file_name
        const image = img_repo.create(data);
        await img_repo.save(image);
        return image;
    }
    @Mutation(() => Video)
    async create_video(@Arg("data") data: CreateVideoInput) {
        let vid_repo = AppDataSource.getRepository(Video);
        if (!!!data.name) data.name = data.file_name
        const video = vid_repo.create(data);
        await vid_repo.save(video);
        return video;
    }
}
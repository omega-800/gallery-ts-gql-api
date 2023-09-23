import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Gallery } from "../entity/Gallery";
import { Product } from "../entity/Product";
import { CreateGalleryInput } from "../inputs/Gallery";
import { FileData } from "../entity/File";

const relationsAll = { relations: { files: true, product: true } }

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
        data.file_ids?.forEach(async id => {
            let file = await AppDataSource.getRepository(FileData).findOne({ where: { id } })
            if (file) files.push(file)
        })
        let product;
        if (data.product_id) product = await AppDataSource.getRepository(Product).findOne({ where: { id: data.product_id } })

        const gallery = repo.create({ ...data, files: files, product: product });
        await repo.save(gallery);
        return gallery;
    }
}

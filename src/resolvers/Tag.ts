import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { CreateTagInput } from "../inputs/Tag";
import { FileData } from "../entity/File";

const relationsAll = { relations: { files: true } }

@Resolver(of => Tag)
class TagResolver {
    @Query(() => Tag)
    async tag(@Arg("id") id: string) {
        return await AppDataSource.getRepository(Tag).findOne({ where: { id }, ...relationsAll })
    }
    @Query(() => [Tag])
    async tags() {
        return await AppDataSource.getRepository(Tag).find(relationsAll);
    }
    @Mutation(() => Tag)
    async create_tag(@Arg("data") data: CreateTagInput) {
        let repo = AppDataSource.getRepository(Tag);
        let files: FileData[] = [];
        data.file_ids?.forEach(async id => {
            let file = await AppDataSource.getRepository(FileData).findOne({ where: { id } })
            if (file) files.push(file)
        })

        const tag = repo.create({ ...data, files: files });
        await repo.save(tag);
        return tag;
    }
}


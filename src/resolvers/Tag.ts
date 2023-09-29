import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { AlterTagInput, CreateTagInput } from "../inputs/Tag";
import { FileData } from "../entity/File";

const relationsAll = { relations: { files: true }, withDeleted: true }

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
    @Mutation(() => Tag)
    async delete_tag(@Arg("id") id: string) {
        await AppDataSource.getRepository(Tag).softDelete(id)
        return this.tag(id);
    }
    @Mutation(() => Tag)
    async restore_tag(@Arg("id") id: string) {
        await AppDataSource.getRepository(Tag).restore(id)
        return this.tag(id);
    }
    @Mutation(() => Tag)
    async alter_tag(@Arg("data") data: AlterTagInput) {
        await AppDataSource.getRepository(Tag).save(data)
        return this.tag(data.id);
    }
}


import express from 'express'
import { Image, Video } from './entity/File'
import { AppDataSource } from './data-source'
import { ValidationError, validate } from 'class-validator'
import { FieldResolver, buildSchema } from 'type-graphql'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { Category } from './entity/Category'
import { Tag } from './entity/Tag'
import { Gallery } from './entity/Gallery'
import { ShopItem } from './entity/ShopItem'

//import postgraphile from 'postgraphile'

const app = async () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.ts'],
        validate: true
    })
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true,
            customFormatErrorFn: err => {
                console.log("Exception raised!", err);
                return err;
            }
        })
    )
    /*app.use(postgraphile(`postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, 'public', {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }))*/

    app.get('/api', async (req, res, next) => {
        res.send('success')
    })

    app.post('/api/test', async (req, res, next) => {

        const tag = new Tag();
        tag.name = 'tag' + (Math.random() + 1).toString(36).substring(7)
        tag.description = 'tagdesc'
        await AppDataSource.manager.save(tag)

        const tag2 = new Tag();
        tag2.name = 'tag2' + (Math.random() + 1).toString(36).substring(7)
        tag2.description = 'tag2desc'
        await AppDataSource.manager.save(tag2)

        const image = new Image();
        /*image.url = 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
        image.preview_url = 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'*/
        image.file_type = 'jpg'
        image.file_name = 'camera'
        image.file_name_orig = 'fight'
        image.width = 20
        image.height = 20
        image.width_prev = 20
        image.height_prev = 20
        image.size = 20
        image.favorite = false
        image.edited = false
        image.tags = [tag]
        await AppDataSource.manager.save(image)

        const image2 = new Image();
        /*image2.url = 'https://media.gcflearnfree.org/ctassets/topics/246/share_flower_fullsize.jpg'
        image2.preview_url = 'https://media.gcflearnfree.org/ctassets/topics/246/share_flower_fullsize.jpg'*/
        image2.file_type = 'jpg'
        image2.file_name = 'flower'
        image2.file_name_orig = 'fight'
        image2.width = 20
        image2.height = 20
        image2.size = 20
        image2.favorite = false
        image2.edited = false
        image2.width_prev = 20
        image2.height_prev = 20
        await AppDataSource.manager.save(image2)

        const video2 = new Video();
        /*video2.url = 'https://archive.org/download/yusukevsjin/Yusuke%20VS%20Jin.mp4'
        video2.preview_url = 'https://archive.org/download/yusukevsjin/Yusuke%20VS%20Jin.mp4'*/
        video2.file_type = 'mp4'
        video2.file_name = 'fight'
        video2.file_name_orig = 'fight'
        video2.width = 120
        video2.height = 120
        video2.width_prev = 20
        video2.height_prev = 20
        video2.size = 20
        video2.fps = 20
        video2.fps_prev = 20
        video2.duration = 20
        video2.favorite = false
        video2.edited = false
        video2.tags = [tag, tag2]
        await AppDataSource.manager.save(video2)

        const category = new Category();
        category.name = 'category' + (Math.random() + 1).toString(36).substring(7)
        category.description = 'categorydesc'
        await AppDataSource.manager.save(category)

        const gallery = new Gallery();
        gallery.name = 'gallery' + (Math.random() + 1).toString(36).substring(7)
        gallery.files = [video2, image]
        await AppDataSource.manager.save(gallery)

        const shopItem = new ShopItem();
        shopItem.name = 'shopitem' + (Math.random() + 1).toString(36).substring(7)
        shopItem.price = 12.20
        shopItem.category = category
        shopItem.files = [image]
        shopItem.files.push(video2)

        const shopItem_clone = Object.assign(Object.create(Object.getPrototypeOf(shopItem)), shopItem)
        validate(shopItem_clone, { whitelist: true }).then(async errors => {
            if (errors.length == 0) {
                await AppDataSource.manager.save(shopItem)
            } else {
                console.log(errors)
            }
        })
    })

    return app
}

export default app
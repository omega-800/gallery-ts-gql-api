import express from 'express'
import { Image, Video } from './entity/File'
import { AppDataSource } from './data-source'
import { Product } from './entity/Product'
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
        const image = new Image();
        image.url = 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
        image.preview_url = 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
        image.file_type = 'jpg'
        image.file_name = 'camera'
        image.width = 20
        image.height = 20
        await AppDataSource.manager.save(image)

        const image2 = new Image();
        image2.url = 'https://media.gcflearnfree.org/ctassets/topics/246/share_flower_fullsize.jpg'
        image2.preview_url = 'https://media.gcflearnfree.org/ctassets/topics/246/share_flower_fullsize.jpg'
        image2.file_type = 'jpg'
        image2.file_name = 'flower'
        image2.width = 20
        image2.height = 20
        await AppDataSource.manager.save(image2)

        const video2 = new Video();
        video2.url = 'https://archive.org/download/yusukevsjin/Yusuke%20VS%20Jin.mp4'
        video2.preview_url = 'https://archive.org/download/yusukevsjin/Yusuke%20VS%20Jin.mp4'
        video2.file_type = 'mp4'
        video2.file_name = 'fight'
        video2.width = 120
        video2.height = 120
        await AppDataSource.manager.save(video2)

        const product = new Product();
        product.name = 'product' + (Math.random() + 1).toString(36).substring(7)
        product.description = 'productdesc'
        product.file = image
        const product_clone = Object.assign(Object.create(Object.getPrototypeOf(product)), product)
        validate(product_clone, { whitelist: true }).then(async errors => {
            if (errors.length == 0) {
                await AppDataSource.manager.save(product)
            } else {
                console.log(errors)
            }
        })

        const category = new Category();
        category.name = 'category' + (Math.random() + 1).toString(36).substring(7)
        category.description = 'categorydesc'
        await AppDataSource.manager.save(category)

        const tag = new Tag();
        tag.name = 'tag' + (Math.random() + 1).toString(36).substring(7)
        tag.description = 'tagdesc'
        await AppDataSource.manager.save(tag)

        const gallery = new Gallery();
        gallery.name = 'gallery' + (Math.random() + 1).toString(36).substring(7)
        gallery.files = [video2, image]
        await AppDataSource.manager.save(gallery)

        const product2 = new Product();
        product2.name = '2product' + (Math.random() + 1).toString(36).substring(7)
        product2.description = '2productdesc'
        product2.gallery = gallery
        product2.tags = [tag]
        const product2_clone = Object.assign(Object.create(Object.getPrototypeOf(product2)), product2)
        validate(product2_clone, { whitelist: true }).then(async errors => {
            if (errors.length == 0) {
                await AppDataSource.manager.save(product2)
            } else {
                console.log(errors)
            }
        })

        let prods: Product[] = []
        if (product) prods.push(product)
        if (product2) prods.push(product2)
        const shopItem = new ShopItem();
        shopItem.name = 'shopitem' + (Math.random() + 1).toString(36).substring(7)
        shopItem.price = 12.20
        shopItem.category = category
        shopItem.products = prods
        await AppDataSource.manager.save(shopItem)
    })

    return app
}

export default app
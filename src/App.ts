import express from 'express'
import { Image } from './entity/File'
import { AppDataSource } from './data-source'
import { Product } from './entity/Product'
import { ValidationError, validate } from 'class-validator'
import { FieldResolver, buildSchema } from 'type-graphql'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

//import postgraphile from 'postgraphile'

const app = async () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.ts'],
        validate: false
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
    })

    return app
}

export default app
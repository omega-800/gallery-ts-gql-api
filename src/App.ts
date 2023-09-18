import express from 'express'
import { Image } from './entity/File'
import { AppDataSource } from './data-source'
import { Product } from './entity/Product'
import { ValidationError, validate } from 'class-validator'
import { FieldResolver, buildSchema } from 'type-graphql'
import { graphqlHTTP } from 'express-graphql'
//import postgraphile from 'postgraphile'

const app = async () => {
    const app = express()
    app.use(express.json())

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
        image.url = 'url'
        image.preview_url = 'preview_url'
        image.file_type = 'png'
        image.file_name = 'file_name'
        image.width = 20
        image.height = 20
        await AppDataSource.manager.save(image)

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
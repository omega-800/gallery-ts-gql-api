import { AppDataSource } from "./data-source"
import App from './App'
import "dotenv/config"

AppDataSource.initialize().then(async () => {
    const app = await App()
    app.listen(process.env.API_PORT, () => {
        console.log(`Server running on port ${process.env.API_PORT}`)
    })
}).catch((err) => {
    console.error(err.stack)
})
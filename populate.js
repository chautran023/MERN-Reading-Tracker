import {readFile} from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import Item from './models/Item.js'
//command: in master folder >> node populate
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        // await Item.deleteMany()
        const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)))
        await Item.create(jsonProducts)
        console.log('success!!!')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(0)    
    }
}
start()
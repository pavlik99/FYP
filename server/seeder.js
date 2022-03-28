import mongoose from "mongoose"
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connDB from "./dataconfig/database.js"

dotenv.config()

connDB()

const importData = async () => {

    try {

        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
       
       const generatedUser = await User.insertMany(users)
       const managerUser = generatedUser[0]._id
       const generatedProducts = products.map(product => {
           return {...product, user: managerUser }
       })
        await Product.insertMany(generatedProducts)
        console.log('Successfully imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
    
}

const deleteData = async () => {

    try {

        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
       
        console.log('Successfully deleted!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }  
}

if (process.argv[2] === '-d') {
    deleteData()
} else {
    importData()
}
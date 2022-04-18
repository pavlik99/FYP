import express from 'express'
import dotenv from 'dotenv'
import connDB from './dataconfig/database.js'
import bodyParser from 'body-parser'
import path from 'path'
//IMPORTING ROUTES
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import imageRoutes from './routes/imageRoutes.js'

dotenv.config()
connDB()

const app = express()
app.use(bodyParser.json())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running.')
})

app.use('/api/products', productRoutes)
app.use('/api/account', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', imageRoutes)

const __dirname = path.resolve()
app.use('/images', express.static(path.join(__dirname, '/images')))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))

import express from 'express'
import dotenv from 'dotenv'
import connDB from './dataconfig/database.js'

//IMPORTING ROUTES
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running.')
})

app.use('/api/products', productRoutes)
app.use('/api/account', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))

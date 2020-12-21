import express from'express';
import path from 'path'
import dotenv from'dotenv'
import {connectDb} from './config/db.js'
import {notFound,errorHandler} from './middlewares/errorMiddleware.js'
import  productRoutes from './routes/productRoutes.js'
import  userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
//mongodb+srv://arman019:inzamamul@cluster0.nx4ee.mongodb.net/ezshop
dotenv.config()
const app = express();
app.use(express.json()) //its like body-parser to parse json files

connectDb()
app.get('/', (req, res) => {
    res.send('api connected ...')
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve() // because we are not using general nodjs format we have to use path.resolve her

app.use('/uploads',(express.static (path.join(__dirname,'/uploads')))) // making uploads folder static

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || '5000' 

app.listen(PORT, () => {
    console.log('server running on ',PORT, 'port')
})
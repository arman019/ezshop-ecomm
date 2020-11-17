import express from'express';
import dotenv from'dotenv'
import {connectDb} from './config/db.js'
import {notFound,errorHandler} from './middlewares/errorMiddleware.js'
import  productRoutes from './routes/productRoutes.js'
import  userRoutes from './routes/userRoutes.js'

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

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || '5000' 

app.listen(PORT, () => {
    console.log('server running on ',PORT, 'port')
})
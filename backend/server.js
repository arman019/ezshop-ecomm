import express from'express';
import dotenv from'dotenv'
import {connectDb} from './config/db.js'
import  productRoutes from './routes/productRoutes.js'

//mongodb+srv://arman019:inzamamul@cluster0.nx4ee.mongodb.net/ezshop
dotenv.config()
const app = express();
connectDb()
app.get('/', (req, res) => {
    res.send('api connected ...')
})

app.use('/api/products',productRoutes);

const PORT = process.env.PORT || '5000' 

app.listen(PORT, () => {
    console.log('server running on ',PORT, 'port')
})
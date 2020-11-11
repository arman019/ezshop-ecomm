import express from'express';
import dotenv from'dotenv'
import {connectDb} from './config/db.js'
import products from './data/products.js';

//mongodb+srv://arman019:inzamamul@cluster0.nx4ee.mongodb.net/ezshop
dotenv.config()
const app = express();
connectDb()
app.get('/', (req, res) => {
    res.send('api connected ...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => (p._id === req.params.id))
    // console.log(product);
    res.json(product)
})

const PORT = process.env.PORT || '5000' 

app.listen(PORT, () => {
    console.log('server running on ',PORT, 'port')
})
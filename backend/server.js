const express = require('express');
const products = require('./data/products');

const app = express();

app.get('/',(req,res)=>{
    res.send('api connected ...')
})

app.get('/api/products',(req,res)=>{
   res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
   const product = products.find(p =>(p._id === req.params.id))
   console.log(product);
   res.json(product)
 })

app.listen('5000', ()=>{
    console.log('server running on 5000 port')
})
import express from 'express';
import {getAllproducts,getProductById} from '../controller/productController.js'

const router = express.Router();

router.get('/', getAllproducts)

router.get('/:id',getProductById);

export default router;
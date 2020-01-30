const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controller');

router.get('/products', ProductsController.getAll);

router.get('/products/random', ProductsController.getRandom);

router.get('/products/:id', ProductsController.getOne);

router.post('/products', ProductsController.postOne);

router.put('/products/:id', ProductsController.putOne);

router.delete('/products/:id', ProductsController.deleteOne);

module.exports = router;

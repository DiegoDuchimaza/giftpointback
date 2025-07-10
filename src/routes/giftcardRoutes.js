const express = require('express');
const router = express.Router();
const productController = require('../controllers/giftcardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/list', authMiddleware, productController.getProducts);
router.post('/product/:id', authMiddleware, productController.getProductDetail);
router.post('/create', authMiddleware, productController.createProduct);
router.patch('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.post('/transfer', authMiddleware, productController.transferValue);
router.post('/listWithout/:id', authMiddleware, productController.getAllWithout);



module.exports = (app) => app.use("/api/giftcards", router);

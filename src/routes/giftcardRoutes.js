const express = require('express');
const router = express.Router();
const productController = require('../controllers/giftcardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productController.getProducts);
router.get('/:id', authMiddleware, productController.getProductDetail);
router.post('/', authMiddleware, productController.createProduct);
router.patch('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;

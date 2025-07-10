const productModel = require('../models/giftcardModel');

const createProduct = (req, res) => {
 const { title,amount, currency, expirationDate, balance } = req.body;

  if (!title || !amount || !currency || !expirationDate || !balance) {
    return res.status(400).json({ error: 'Faltan datos de la tarjeta' });
  }

  const product = {
    title,
    amount,
    currency,
    expirationDate,
    balance,
    user_id: req.userId 
  };

  productModel.create(product, (err) => {
    if (err) return res.status(500).json({ error: 'Error al crear una tarjeta de regalo' });
    res.status(201).json({ message: 'Tarjeta de regalo creada' });
  });
};

const getProducts = (req, res) => {
  productModel.findAll(req.userId,(err, products) => {
    if (err) return res.status(500).json({ error: 'Error al obtener lista de tarjetas' });
    res.status(200).json(products);
  });
};

const getProductDetail = (req, res) => {
  const id = req.params.id;
  productModel.findById(id, (err, product) => {
    if (err || !product) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    if (product.expirationDate) {
      const expirationDate = new Date(product.expirationDate);
      const today = new Date();

      const sameMonth = expirationDate.getMonth() === today.getMonth();
      const sameYear = expirationDate.getFullYear() === today.getFullYear();

      product.notExpiration = sameMonth && sameYear;    
    }else{
      product.notExpiration = false;
    }
    res.json(product);
  });
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const { balance, expirationDate } = req.body;
  productModel.update(id,balance,expirationDate,req.userId, (err, product) => {
    if (err || !product) return res.status(500).json({ error: 'Error al actualizar la información de la tarjeta' });
    res.json(product);
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  productModel.destroy(id, (err, product) => {
    if (err || !product) return res.status(500).json({ error: 'Error al eliminar tarjeta' });
    res.json(product);
  });
};

const transferValue = (req,res) => {
 const { fromId,toId, balance } = req.body;
 console.log(fromId, toId, balance)
   productModel.transfer(fromId, toId, balance,(err, result) =>{
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Transferencia realizada correctamente', result });
   });
}

const getAllWithout = (req,res) => {
  const id = req.params.id;
   productModel.findAllWithout(id, req.userId,(err, products) =>{
    if (err) return res.status(500).json({ error: 'Error al obtener lista de tarjetas' });
    res.status(200).json(products);
   });
}
module.exports = {
  createProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  transferValue,
  getAllWithout
};
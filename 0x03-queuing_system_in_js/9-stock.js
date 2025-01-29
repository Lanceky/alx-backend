// 9-stock.js

import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create an Express app
const app = express();

// Sample list of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Create Redis client and promisify functions
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Function to get a product by id
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Route: GET /list_products
app.get('/list_products', (req, res) => {
  const products = listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  }));
  res.json(products);
});

// Route: GET /list_products/:itemId
app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(Number(itemId));

  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(Number(itemId));
  const availableQuantity = product.stock - (reservedStock || 0);
  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity: availableQuantity
  });
});

// Function to reserve stock by id
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Function to get current reserved stock by id
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock, 10) : 0;
}

// Route: GET /reserve_product/:itemId
app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(Number(itemId));

  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(Number(itemId));
  const availableStock = product.stock - reservedStock;

  if (availableStock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId: product.id });
  }

  await reserveStockById(Number(itemId), reservedStock + 1);
  res.json({ status: 'Reservation confirmed', itemId: product.id });
});

// Start the server on port 1245
app.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

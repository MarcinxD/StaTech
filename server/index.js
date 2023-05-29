import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

//mis rutas
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`El servidor esta corriendo sobre el puerto ${port}.`);
});

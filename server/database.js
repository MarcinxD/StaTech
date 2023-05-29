// conexion a la base de datos
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB conectado: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectToDatabase;

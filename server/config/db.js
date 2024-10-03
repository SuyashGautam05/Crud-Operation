const mongoose = require('mongoose');
const connectDB = async()=> {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 100000, // 100 seconds for server selection
      socketTimeoutMS: 100000, // Increase socket timeout as well
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB Connection Error:', error.message);

  }
}



module.exports = connectDB;



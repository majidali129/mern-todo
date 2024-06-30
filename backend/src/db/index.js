import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.DB_URI.replace(
      '<PASSWORD>',
      process.env.DB_PASSWORD
    ).replace('<DBNAME>', process.env.DB_NAME);

    const connInstance = await mongoose.connect(uri);
    console.log(`\n Mongodb connected at host ${connInstance.connection.host} 🚀🚀`);
    return connInstance;
  } catch (error) {
    console.log('MongoDB Error::', error);
    process.exit(1);
  }
};

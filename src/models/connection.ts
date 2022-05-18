import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { PASSWORD } = process.env;

const connection = (mongoDatabaseURI = `mongodb+srv://blitzdatabase:${PASSWORD}@ebytr.qbchg.mongodb.net/?retryWrites=true&w=majority`) =>
  mongoose.connect(mongoDatabaseURI);

export default connection;
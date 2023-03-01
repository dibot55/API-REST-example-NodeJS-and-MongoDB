// Variables de entorno
import { config } from 'dotenv';

config();

export default {
  mongo_uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restapi?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1"
}
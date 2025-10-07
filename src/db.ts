// db.ts
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("⚠️ Defina a variável MONGODB_URI no .env.local");
}

// Tipagem para o Node global (evita recriar a conexão em serverless)
declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (!global.mongooseConn) {
    global.mongooseConn = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGO_DB || "aikido",
    });
    console.info("✅ Conectado ao MongoDB");
  }
  return global.mongooseConn;
}

export async function close() {
    mongoose.connection.close()
    .then(res => {
        //if(res) {
            console.info(`Disconected`);
        //}
    }).catch(err => {
        console.error(err)
    });
}
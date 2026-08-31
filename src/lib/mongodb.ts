import { MongoClient } from "mongodb";

const uri = import.meta.env.MONGODB_URI;
const dbName = import.meta.env.MONGODB_DB;

if (!uri) {
  throw new Error("MONGODB_URI no está definida");
}

if (!dbName) {
  throw new Error("MONGODB_DB no está definida");
}

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (import.meta.env.DEV) {
  const globalWithMongo = globalThis as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export async function getDatabase() {
  const mongoClient = await clientPromise;

  return mongoClient.db(dbName);
}
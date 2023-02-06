import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { products?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  await db.command({
    collMod: process.env.PRODUCTS_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "price", "category", "inStockQuantity"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: {
            bsonType: "string",
            description: "'name' is required and is a string",
          },
          price: {
            bsonType: "number",
            description: "'price' is required and is a number",
          },
          category: {
            bsonType: "string",
            description: "'category' is required and is a string",
          },
          inStockQuantity: {
            bsonType: "number",
            description: "'inStockQuantity' is required and is a number",
          },
          timeAdded: {
            bsonType: "date",
            description: "'timeAdded' is required and is a date",
          },
        },
      },
    },
  });

  const productsCollection: mongoDB.Collection = db.collection(
    process.env.PRODUCTS_COLLECTION_NAME!
  );

  collections.products = productsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`
  );
}

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDb() {
  console.log({ uri });
  try {
    await client.connect();
    await client.db("Voterz").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

module.exports = { connectDb };

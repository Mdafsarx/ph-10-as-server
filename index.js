const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
// middleWare
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mdafsar99009:sF5mneEKKJ4d$.-@cluster0.zgmhkd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });

        //  for craft items
        const craftItems = client.db("CraftItemDB").collection('craftItems');


        // post craft-items-section data
        app.post('/craftSection', async (req, res) => {
            const result = await craftItems.insertOne(req.body);
            res.send(result);
        })
        // get craft-items-section data
        app.get('/craftSection', async (req, res) => {
            const cursor = craftItems.find();
            const result = await cursor.toArray();
            res.send(result);
        })















        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('ph-as-10-server is running properly')
})

app.listen(port, () => {
    console.log('server is running on 3000 port')
})
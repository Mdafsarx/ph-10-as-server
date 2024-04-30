const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
// middleWare
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zgmhkd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        const ArtCraft = client.db("ArtCraftDb").collection('ArtCraft');
        // const category = client.db("ArtCraftDb").collection('Category');


        // post craft-items-section data
        app.post('/CraftItem', async (req, res) => {
            const result = await craftItems.insertOne(req.body);
            res.send(result);
        })
        // get craft-items-section data
        app.get('/CraftItem', async (req, res) => {
            const cursor = craftItems.find();
            const result = await cursor.toArray();
            res.send(result);
        })



        app.post('/ArtCraft', async (req, res) => {
            const result = await ArtCraft.insertOne(req.body);
            res.send(result);
        })

        app.get('/ArtCraft', async (req, res) => {
            const cursor = ArtCraft.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/ArtCraft/:email', async (req, res) => {
            const filter = { email: req.params.email }
            const cursor = ArtCraft.find(filter);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/ArtCraft/email/:id', async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) };
            const result = await ArtCraft.findOne(query);
            res.send(result)
        })

        app.delete('/ArtCraft/:id', async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) };
            const result = await ArtCraft.deleteOne(query);
            res.send(result)

        })

        app.put('/art/:id', async (req, res) => {
            const data = req.body;
            const filter = { _id: new ObjectId(req.params.id) };
            const updateDoc = {
                $set: {
                    description: data.description,
                    price: data.price,
                    rating: data.rating,
                    customization: data.customization,
                    processing: data.processing,
                    subcategory: data.subcategory,
                    stock: data.stock,
                    Image: data.Image,
                    Item: data.Item,
                },
            };
            const result = await ArtCraft.updateOne(filter, updateDoc);
            res.send(result)
        })
        
        // app.get('/Category', async (req, res) => {
        //     const cursor = category.find();
        //     const result = await cursor.toArray();
        //     res.send(result);
        // })




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
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
// middleWare
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('ph-as-10-server is running properly')
})

app.listen(port,()=>{
    console.log('server is running on 2000 port')
})
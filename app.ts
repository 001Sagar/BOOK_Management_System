import express from 'express';
const app = express();
const port = process.env.PORT || 8000;

app.get('/', async (req, res) =>{
    res.send("<h1>Yeah ! Server is Run</h1>")
})

// Body-Parser
app.use(express.urlencoded({extended:true}));
app.use(express.json())

// Import Database
import database from './config/mongoose';
database();


// Require API Path
import api from './routes/route.ts';
app.use('/api', api);


app.listen(port , () =>{
    console.log(`Server is Run on PORT ::${port}:`)
})
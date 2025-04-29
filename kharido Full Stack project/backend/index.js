const express = require('express');
const  mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const port = 8080;

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.use(express.json());
app.use(cors());

try {
    mongoose.connect('mongodb+srv://anurag8333:Anurag8333@cluster0.2xg0a.mongodb.net/Provision',{})
    .then(()=>{
        console.log('Connected to the database');
    })
    .catch((error)=>{
        console.log(error);
    });
} catch (error) {
    console.log(error); 
}

app.use('/api/users',userRoutes);

app.use('/api/items',require('./routes/itemRoutes'));
app.use('/api/orders',require('./routes/orderRoutes'));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
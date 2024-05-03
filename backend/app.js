const express = require ('express');
const mongoose = require ('mongoose');
const userRoutes = require ('./routes/userRoutes');
const blogRoutes = require ('./routes/blogRoutes');
const commentRoutes = require ('./routes/commentRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/node-project')
.then(() => {
    console.log('Connected to MongoDB')
}).catch(err =>{
    console.error('Failed to Connect to MongoDB', err);
    process.exit(1);
});

app.use(userRoutes);
app.use(blogRoutes);
app.use(commentRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something Broke'});
});


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
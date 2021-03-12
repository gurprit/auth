import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';
const morgan = require ('morgan');


require ('dotenv').config();

//app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindandModify: false, 
    useCreateIndex: true, 
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log('DB CONNECTION ERROR ', err))

//middleware
app.use(cors());
app.use(morgan('dev'));

//routes middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));


//routes


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
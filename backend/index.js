import express from 'express';
import mongoose from 'mongoose';
import route from  './route/routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';


var app = express();


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended : true}));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('uploads'))
app.use(express.static('files'))
app.use(cors());
app.use('/users', route);


const PORT = 4000;
const URL = 'mongodb://localhost:27017/sellyourcar';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        app.listen(PORT, () => {
            console.log(`server successfully running on port ${PORT}`);
        });
    }).catch(err => {
        console.log('ERROR: ', err);
    });
 
 

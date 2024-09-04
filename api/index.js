import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js'
import bcrypt from 'bcrypt'

const app = express();

const salt = 'hgdhghdghdjk';

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://snehasishmohanty9439:Snehasish002@cluster0.oregp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.post('/register', async (req,res) => {
    const {username,password} =  req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (error) {
        res.json(400).json(error)
       
    }
    
    
});

app.listen(3000);


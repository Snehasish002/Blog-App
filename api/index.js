import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://snehasishmohanty9439:Snehasish002@cluster0.oregp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (error) {

        console.log(error)
        res.json(400).json(error)

    }


});

app.post('/login', async (req,res) => {
    const {username, password } = req.body;
    const userDoc = await User.findOne({username});
   const passOk = bcrypt.compareSync(password, userDoc.password)
   if(passOk){
        //Logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username
            });
        });
   }else{
        res.status(400).json('Wrong Credentials');
   }
})

app.get('/profile', (req,res) => {

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(3000);


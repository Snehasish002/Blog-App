import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import Post from './models/Post.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const uploadMiddleWare = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }
});

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
        res.status(400).json(error);


    }


});

// app.post('/login', async (req,res) => {
//     const {username, password } = req.body;
//     const userDoc = await User.findOne({username});
//    const passOk = bcrypt.compareSync(password, userDoc.password)
//    if(passOk){
//         //Logged in
//         jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
//             if (err) throw err;
//             res.cookie('token', token).json({
//                 id:userDoc._id,
//                 username
//             });
//         });
//    }else{
//         res.status(400).json('Wrong Credentials');
//    }
// })

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json('Wrong Credentials');
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            // Logged in successfully
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) {
                    return res.status(500).json({ error: 'JWT signing failed' });
                }
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username
                });
            });
        } else {
            res.status(400).json('Wrong Credentials');
        }
    } catch (err) {
        console.error(err); // Log the error to the server console
        res.status(500).json({ error: 'Login failed' });
    }
});


app.get('/profile', (req, res) => {

    const { token } = req.cookies;

    if (!token) {
        // If no token is provided, return a 401 (Unauthorized) response
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Return a 403 (Forbidden) response if the token is invalid
            return res.status(403).json({ error: "Invalid token" });
        }
        res.json(info); // If the token is valid, send back the user info
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
});

app.post("/post", uploadMiddleWare.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }
            const { title, summary, content } = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id
            });
            res.json(postDoc);
        });
    } catch (error) {
        if (error instanceof multer.MulterError) {
            // Handle Multer-specific errors
            res.status(400).json({ error: 'File upload error: ' + error.message });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'An error occurred: ' + error.message });
        }
    }
});


app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            // Return a 403 (Forbidden) response if the token is invalid
            return res.status(403).json({ error: "Invalid token" });
        }

        const {id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author === JSON.stringify(info.id));

        if(!isAuthor){

            return res.status(400).json('You are not the author')
           
        };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                title,
                summary,
                content,
                cover: newPath ? newPath : postDoc.cover,
            },
            { new: true } // This option returns the updated document
        );

        res.json(updatedPost);

    });

})

app.get('/post', async (req, res) => {

    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    )
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

app.listen(3000);


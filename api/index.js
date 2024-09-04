import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req,res) => {
    const {userName,password} = req.body
    res.json({requestData:{userName,password}})
})

app.listen(3000);
// mongodb+srv://snehasishmohanty9439:snehasishmohanty9439@cluster0.oregp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

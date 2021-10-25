const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const path = require('path');
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/sign-in.html');
    });

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Red_Code:Red_Code@cluster0.nvkal.mongodb.net/Red_Code?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()


const express = require('express')
const app = express()



app.get('/', (req, res) => res.send("Welcome to base path"))


app.post('/form', (req, res) => res.send({message:data}))



app.get('/show', (req, res) => res.send({message:data}))


app.listen(3500, () => { console.log("Server is running at http://localhost:3500") })
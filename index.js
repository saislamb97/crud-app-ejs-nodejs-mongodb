const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const dbschema = require('./models/database')
dotenv.config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/form', (req, res) => {
    res.render('form')
  })


app.post('/formpost', (req, res) => {

  const formdata = new dbschema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  formdata.save().then(data => {
        res.send(data)
    }).catch((err)=>{
        res.json({message:err})
    })

})


app.get('/show', (req, res) => {
  dbschema.find().then(result=>{
    res.render('show', { userdata: result })
  }).catch((err)=>{
    
    res.json({message:err})
  })
})

app.get('/delete/:id', async (req, res) => {
  await dbschema.findByIdAndDelete(req.params.id)
  res.redirect('/show')

})

app.get('/edit/:id', (req, res) => {
  dbschema.findById(req.params.id).then(result=>{
    res.render('edit', { userdata: result })
  }).catch((err)=> {
    res.json({message:err})
  })
})


app.post('/update/:id', async (req, res) => {

  await dbschema.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/show')
})

app.listen(6450, () => { console.log("Server is running at http://localhost:6450") })
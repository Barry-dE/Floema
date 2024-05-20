require('dotenv').config()
console.log(process.env.PRISMIC_ENDPOINT)
const express = require('express')
const path = require('path-browserify')
const app = express()
const port = 5173

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('pages/home')
})

app.get('/about', (req, res) => {
    res.render('pages/about')
})

app.get('/detail/:id', (req, res) => {
    res.render('pages/detail')
})

app.get('/collections', (req, res) => {
    res.render('pages/collections')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

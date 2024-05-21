require('dotenv').config()

const express = require('express')
const path = require('path-browserify')
const app = express()
const port = 5173

const Prismic = require('@prismicio/client')
// const PrismicDom = require('prismic-dom')
const PrismicDom = require('prismic-dom')
const { log } = require('util')
const { each } = require('lodash')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Link resolvers
const handleLinkResolver = () => {
    return '/'
}

// Middleware
app.use((req, res, next) => {
    res.locals.ctx = {
        endpoint: process.env.PRISMIC_ENDPOINT,
        linkResolver: handleLinkResolver,
    }

    res.locals.PrismicDom = PrismicDom

    next()
})

//connect to the prismic API
function initApi(req) {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req,
    })
}

app.get('/', (req, res) => {
    res.render('pages/home')
})

app.get('/about', (req, res) => {
    initApi(req)
        .then((api) => {
            return api.query(
                Prismic.Predicates.any('document.type', ['meta', 'about']),
            )
        })
        .then((response) => {
            const { results } = response
            const [meta, about] = results

            each(about.data.body, (item) => {
                console.log(item)
            })

            res.render('pages/about', { about, meta, descriptions })
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('Error querying Prismic API')
        })
})

app.get('/detail/:id', (req, res) => {
    initApi(req)
        .then((api) => {
            return api.query(
                Prismic.Predicates.any('document.type', ['meta', 'about']),
            )
        })
        .then((response) => {
            const { results } = response
            const [meta, about] = results
            res.render('pages/about', { about, meta })
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send('Error querying Prismic API')
        })

    res.render('pages/detail')
})

app.get('/collections', (req, res) => {
    res.render('pages/collections')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

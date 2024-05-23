require('dotenv').config()

const express = require('express')
const path = require('path-browserify')
const app = express()
const errorHandler = require('errorhandler')
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
    // res.locals.ctx = {
    //     endpoint: process.env.PRISMIC_ENDPOINT,
    //     linkResolver: handleLinkResolver,
    // }
    res.locals.Links = handleLinkResolver
    res.locals.PrismicDom = PrismicDom

    next()
})

app.use(errorHandler())

//connect to the prismic API
function initApi(req) {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req,
    })
}

app.get('/', async (req, res) => {
    const api = await initApi(req)
    const home = await api.getSingle('home')
    const preloader = await api.getSingle('preloader')
    const meta = await api.getSingle('meta')
    const navigation = await api.getSingle('navigation')
    const collection = await api.query(
        Prismic.Predicates.at('document.type', 'collection'),
        {
            fetchLinks: 'product.image',
        },
    )
    const { results: collectionsResult } = collection

    res.render('pages/home', {
        collectionsResult,
        home,
        meta,
        preloader,
        navigation,
    })
})

app.get('/about', async (req, res) => {
    const api = await initApi(req)
    const about = await api.getSingle('about')
    const preloader = await api.getSingle('preloader')
    const meta = await api.getSingle('meta')
    const navigation = await api.getSingle('navigation')

    res.render('pages/about', {
        about,
        meta,
        preloader,
        navigation,
    })
})

app.get('/detail/:uid', async (req, res) => {
    const api = await initApi(req)
    const meta = await api.getSingle('meta')
    const preloader = await api.getSingle('preloader')
    const product = await api.getByUID('product', req.params.uid)
    const navigation = await api.getSingle('navigation')
    const collection = await api.query(
        Prismic.Predicates.at('document.type', 'collection'),
    )
    const { results: collectionsResult } = collection

    res.render('pages/detail', {
        meta,
        product,
        preloader,
        navigation,
        collectionsResult,
    })
})

app.get('/collections', async (req, res) => {
    const api = await initApi(req)
    const meta = await api.getSingle('meta')
    const preloader = await api.getSingle('preloader')

    const home = await api.getSingle('home')
    const navigation = await api.getSingle('navigation')
    const { results: collections } = await api.query(
        Prismic.Predicates.at('document.type', 'collection'),
        { fetchLinks: 'product.image' },
    )

    res.render('pages/collections', {
        meta,
        collections,
        home,
        navigation,
        preloader,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

require('dotenv').config()
const express = require('express')
const app = express()
// const errorHandler = require('errorhandler')
const path = require('path')
const port = 5173

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const logger = require('morgan')
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  })
}

// if(process.env.NODE_ENV === 'development'){
//   app.use(errorHandler())
// }

const handleLinkResolver = (doc) => {
 
  if (doc === 'product') {
    return `/detail/${doc.slug}`
  }

  if (doc === 'collections') {
    return '/collection'
  }

  if (doc === 'about') {
    return '/about'
  }

  return '/'
}



app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver
  res.locals.PrismicDOM = PrismicDOM
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

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
  console.log(home)
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

app.get('/collection', async (req, res) => {
  const api = await initApi(req)
  const meta = await api.getSingle('meta')
  const preloader = await api.getSingle('preloader')
  
  const home = await api.getSingle('home')
  const navigation = await api.getSingle('navigation')
  const collection = await api.query(
    Prismic.Predicates.at('document.type', 'collection'),
    {
      fetchLinks: 'product.image',
    },
  )
  const { results: collectionsResult } = collection
  
  res.render('pages/collection', {
    collectionsResult,
    home,
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

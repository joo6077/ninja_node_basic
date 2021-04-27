const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')


// express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.qf67u.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// listen for requests
// app.listen(3000)

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('in the next middleware')
    next()
})

app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    // absolute root
    // res.sendFile('./views/index.html', { root: __dirname })
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ]
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' })
})

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' })
})


// 404 page
// every request
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: '404' })
})
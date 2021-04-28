const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')


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
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// blog routes
app.use('/blogs', blogRoutes)

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6087bcfa7c786713c8d3a4f2')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


// routes
app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    // absolute root
    // res.sendFile('./views/index.html', { root: __dirname })
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ]
    // res.render('index', { title: 'Home', blogs })
    res.redirect('/blogs')
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


// 404 page
// every request
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: '404' })
})
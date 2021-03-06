let express = require('express')
let db = require('../models')

let router = express.Router()

router.post('/:id', (req, res) => {
  console.log("YOU HIT THIS ROUTE")
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.params.id
  })
  .then((author) => {
    res.redirect(req.params.id)
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


// POST /articles - create a new post
router.post('/', (req, res) => {
  console.log("now you hit this one")
  db.comment.create({
    
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {

  db.article.findOne({
    where: { id : req.params.id },
    include: [db.author, db.comment]
  })
  .then(article => {
    if (!article) throw Error()
    
    res.render('articles/show', { 
      article: article
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
  
})




module.exports = router

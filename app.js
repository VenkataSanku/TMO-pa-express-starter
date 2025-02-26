const express = require("express");
const app = express();

app.use(express.json());

/*app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
*/
app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});

const books = [
  {
    "id": 2,
    "author": "Philip K. Dick",
    "title": "Do Androids Dream of Electric Sheep?",
    "yearPublished": 1968
},
{
    "id": 3,
    "author": "William Gibson",
    "title": "Neuromancer",
    "yearPublished": 1984
},
{
    "id": 1,
    "author": "Douglas Adams",
    "title": "The Hitchhiker's Guide to the Galaxy",
    "yearPublished": 1979
}

];



app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api/books', (req, res) => {
  res.send(books)
})

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
if(!book) return res.status(404).send('the book with given id was not available');
res.send(book);
})
app.post('/api/books', (req, res) => {
  // const schema = {
  //     author: Joi.string().min(3).required()
  // };
  // const result = Joi.Validate(req.body, schema)
  const book = {
      id: books.length + 1,
      author: req.body.author,
      title: req.body.title,
      yearPublished: req.body.yearPublished,
  };
  books.push(book);
  res.send(books);
})


app.delete('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
if(!book) return res.status(404).send('the book with given id was not available');

const index = books.indexOf(book);
books.splice(index, 1);
})


module.exports = app;

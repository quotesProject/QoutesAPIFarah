const express = require("express");
const app = express();
const port = 3082;
const { Quote, db } = require("../data/defineDB.js");
const {quotesDB} = require("../data/seedData.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send('Works!')
})

app.get("/users/:name", (req, res) => {
  // users/name?name=Alex
  return res.send(`How are you ${req.query.name} !`); // How are you Alex
});

app.get('/quotes', async (req, res) => {
  let quotes = await Quote.findAll()
  res.status(200).json(quotes)
})

app.post('/quotes', async (req, res) => {
  const {text, author} = req.body
  if (!text && !author) {
    res.status(401).send('New Quote object is malformed.')
    return 
  }
  const newQuote = await Quote.create({text: text, author:author})
  res.send(newQuote)
})

app.delete('/quotes/:id', async (req, res) => {
  let {id} = req.params
  await Quote.destroy({where: {id:id}})
  res.send('Quote has been deleted.')

})

app.get("/random", async (req, res) => {
  let quotes = await Quote.findAll()
  function randomRange(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  
  }
  let index = randomRange(0, quotes.length-1)
  res.json(quotes[index])
});

const configureApp = async () => {
  await db.sync({force: true})
  await Quote.bulkCreate(quotesDB)
  //seed database
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

configureApp()


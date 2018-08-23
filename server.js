const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');



const app = express(); 



MongoClient.connect('mongodb://grrrr:12345678a@ds127139.mlab.com:27139/lost2600', (err, client) => {//you can put url to the local mongo or a cloud one. ex aws.
	if (err) return console.log(err)
	db = client.db('lost2600') // whatever your database name is
  	app.listen(3000, () => {
    	console.log('listening on 3000')
 	})
})


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


//handling get method
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


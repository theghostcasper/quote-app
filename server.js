const express = require('express');
const bodyParser = require('body-parser');
const connectedToDb = require('./db').connectedToDb;
const db = require('./db');

const app = express(); 

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


//handling get method
app.get('/', (req, res) => {
	db.retreive('quotes', (err,result)=>{
		if (err) return console.log(err)
    	// renders index.ejs
    	res.render('index', {quotes: result})
	})
})


//handling the post method.
app.post('/quotes', (req, res) => {
	db.save('quotes', req.body, (err,result)=>{
		if (err) return console.log(err)
    	console.log('saved to database')
    	res.redirect('/')
	})
})


connectedToDb.on('connected', () => {
	app.listen(3000, () => {
    	console.log('listening on 3000')
 	})
})

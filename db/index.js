const MongoClient = require('mongodb').MongoClient
const EventEmitter = require('events');

const connectedToDb = new EventEmitter(); 
exports.connectedToDb = connectedToDb;

MongoClient.connect('mongodb://grrrr:12345678a@ds127139.mlab.com:27139/lost2600', { useNewUrlParser: true},(err, client) => {//you can put url to the local mongo or a cloud one. ex aws.
	if (err) return console.log(err)
	db = client.db('lost2600') // whatever your database name is
  	connectedToDb.emit('connected')
})




exports.save = (collectionName, body,callback )=>{
	 db.collection('quotes').save(body, (callback))
}


exports.retreive =  (collectionName,callback) => {
	db.collection('quotes').find().toArray(callback);
}



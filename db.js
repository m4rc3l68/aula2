const mongoClient = require('mongodb').MongoClient
mongoClient
  .connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })

  .then((connection) => {
    global.connection = connection.db('aula002')
    console.log('Connected to MongoDB!')
  })
  .catch((error) => console.log(error))

function findCustomers() {
  return global.connection.collection('customers').find({}).toArray()
}

module.exports = { findCustomers }

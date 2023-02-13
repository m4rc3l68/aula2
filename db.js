const ObjectId = require('mongodb').ObjectId
const mongoClient = require('mongodb').MongoClient
mongoClient
  .connect(process.env.MONGODB_CONNECTION, { useUnifiedTopology: true })

  .then((connection) => {
    global.connection = connection.db('aula02')
    console.log('Connected to MongoDB!')
  })
  .catch((error) => console.log(error))

function findCustomers() {
  return global.connection.collection('customers').find({}).toArray()
}

function findCustomer(id) {
  const objectId = new ObjectId(id)
  return global.connection.collection('customers').findOne({ _id: objectId })
}

function insertCustomers(customers) {
  return global.connection.collection('customers').insertOne(customers)
}

function updateCustomers(id, customers) {
  const objectId = new ObjectId(id)
  return global.connection
    .collection('customers')
    .updateOne({ _id: objectId }, { $set: customers })
}

function deleteCustomers(id) {
  const objectId = new ObjectId(id)
  return global.connection.collection('customers').deleteOne({ _id: objectId })
}

module.exports = {
  findCustomers,
  insertCustomers,
  updateCustomers,
  deleteCustomers,
  findCustomer,
}

const { Promise } = require('mongoose')

const ObjectId = require('mongodb').ObjectId
const mongoClient = require('mongodb').MongoClient

async function connectDatabase() {
  await Promise.resolve()
  if (!global.connection) {
    const e = new Error()
    Error.captureStackTrace(e, connectDatabase)
    throw e
  }
  mongoClient
    .connect(process.env.MONGODB_CONNECTION, { useUnifiedTopology: true })
    .then((connection) => {
      global.connection = connection.db('aula02')
      console.log('Connected to MongoDB!')
    })
    .catch((error) => {
      console.log(error)
      global.connection = null
    })
}

async function findCustomers() {
  await connectDatabase()
  return global.connection.collection('customers').find({}).toArray()
}

async function findCustomer(id) {
  await connectDatabase()
  const objectId = new ObjectId(id)
  return global.connection.collection('customers').findOne({ _id: objectId })
}

async function insertCustomers(customers) {
  await connectDatabase()
  return global.connection.collection('customers').insertOne(customers)
}

async function updateCustomers(id, customers) {
  await connectDatabase()
  const objectId = new ObjectId(id)
  return global.connection
    .collection('customers')
    .updateOne({ _id: objectId }, { $set: customers })
}

async function deleteCustomers(id) {
  connectDatabase()
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

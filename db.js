const ObjectId = require('mongodb').ObjectId
const mongoClient = require('mongodb').MongoClient

async function connectDatabase() {
  if (!global.connection)
    await mongoClient
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

function findCustomer(id) {
  connectDatabase()
  const objectId = new ObjectId(id)
  return global.connection.collection('customers').findOne({ _id: objectId })
}

function insertCustomers(customers) {
  connectDatabase()
  return global.connection.collection('customers').insertOne(customers)
}

function updateCustomers(id, customers) {
  connectDatabase()
  const objectId = new ObjectId(id)
  return global.connection
    .collection('customers')
    .updateOne({ _id: objectId }, { $set: customers })
}

function deleteCustomers(id) {
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

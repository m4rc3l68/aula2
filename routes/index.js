const express = require('express')
const router = express.Router()
const db = require('../db')

/* GET home page. */
router.get('/', function (req, res, next) {
  db.findCustomers()
    .then((customers) => {
      res.render('index', { title: 'Express', customers })
    })
    .catch((error) => console.log(error))
})

router.get('/new', (req, res) => {
  res.render('customers', { title: 'Cadastro de Clientes' })
})

module.exports = router

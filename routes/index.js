const express = require('express')
const router = express.Router()
const db = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  db.findCustomers()
    .then((customers) => {
      res.render('index', { title: 'Express', customers })
    })
    .catch((error) => {
      console.log(error)
      res.render('error', {
        message:
          'Não foi possível listar os clientes. 👽Ops! Server 404 not found!',
        error: false,
      })
    })
})

router.get('/new', (req, res) => {
  res.render('customers', { title: 'Cadastro de Clientes', customer: {} })
})

router.get('/edit/:customerId', (req, res) => {
  const id = req.params.customerId

  db.findCustomer(id)
    .then((customer) =>
      res.render('customers', { title: 'Edição de Cadastro', customer }),
    )
    .catch((error) => {
      console.log(error)
      res.render('error', {
        message: 'Não foi possível retornar os dados do cliente',
        error,
      })
    })
})

router.get('/delete/:customerId', (req, res) => {
  const id = req.params.customerId
  db.deleteCustomers(id)
    .then((result) => res.redirect('/'))
    .catch((error) => {
      console.log(error)
      res.render('error', {
        message: 'Não foi possível excluir o cliente',
        error,
      })
    })
})

router.post('/new', (req, res) => {
  if (!req.body.nome)
    return res.redirect('/new?error=O campo nome é obrigatório!')

  if (!req.body.idade && !/[0-9]+/.test(req.body.idade))
    return res.redirect('/new?error=O campo idade é numérico!')

  if (!req.body.cidade)
    return res.redirect('/new?error=O campo cidade é obrigatório!')

  const id = req.body.id
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const cidade = req.body.cidade
  const uf = req.body.uf.length > 2 ? '' : req.body.uf

  const customer = { nome, idade, cidade, uf }
  const promise = id
    ? db.updateCustomers(id, customer)
    : db.insertCustomers(customer)

  promise
    .then((result) => {
      res.redirect('/')
    })
    .catch((error) => {
      console.log(error)
      res.render('error', {
        message: 'Não foi possível salvar o cliente',
        error,
      })
    })
})

module.exports = router

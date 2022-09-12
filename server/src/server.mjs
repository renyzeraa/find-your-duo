import express from 'express'

const app = express()

app.get('/ads', () => {
  console.log('Acessou aqui ads')
})

app.listen(3333)

// Fastify: framework utilizado como base do projeto
import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
// Para usar o banco de dados da memoria use:
// const database = new DatabaseMemory()

// Para usar um banco de dados externo use
const database = new DatabasePostgres


//chamando a função que cria
server.post('/user', async (request, response) => {
  //Corpo da Requisição (Request body)
  const { name, password } = request.body

  // Chamando a função create lá do database
  await database.create({
    name: name,
    password: password
  })

  return response.status(201).send()
})

//chamando a função que puxa
server.get('/users', async (request) => {
   // estabelecendo que de dentro do meu request, eu vou buscar pelos parâmetros da minha query
   const search = request.query.search
 
  const users = await database.list(search)

  return users
})

//chamando a função que altera
server.put('/users/:id', async (request, response) => {
  // Inserindo os parâmetros
  const userId = request.params.id

  // Inserindo os atributos que serão passados no body
  const { name, password } = request.body

  // Chamando a função update lá do database
  await database.update(userId, {
    name: name,
    password: password
  })

  return response.status(204).send()
})

//chamando a função que deleta
server.delete('/user/:id', async (request, response) => {
   // Inserindo os parâmetros
  const userId = request.params.id

  await database.delete(userId)

  return response.status(204).send()
})


server.listen({
  port: 8080
})
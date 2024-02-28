//Banco de dados em Memoria
import { randomUUID } from "node:crypto"
import {sql} from './db.js'

export class DatabasePostgres {
  //função para listar
  async list(search) {
  // criando uma variavel users para armazenar os dados
    let users
  // Caso haja algum valor no search, ele vai usar essa query no SQL
    if(search) {
      users = await sql `select * from users where name ilike ${'%'+ search + '%'}`
    } 
    // Caso contrario, ele vai puxar tudo
    else {
      users =  await  sql `select * from users`
    }

    // Retorna o que estiver armazenado na variavel users
    return users
    }
  
  //função para criar
  async create(user) {

    const userId = randomUUID()

    const {name, password} = user

    await sql `insert into users (id, name, password) VALUES (${userId}, ${name}, ${password})`
  }
  //função para atualizar
  async update(id, user) {
    const {name, password} = user

    await sql `update users set name = ${name}, password = ${password} WHERE id = ${id}`

  }
  //função para deletar
  async delete(id) {
    await sql `delete from users WHERE id = ${id}`
  }
}
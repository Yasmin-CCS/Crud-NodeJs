//Banco de dados em Memoria
import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  #users = new Map()

  //função para listar
  list(search) {
    // Colocando as informações de cada um dos usuários e seus IDs dentro de um array para retornar
    return Array.from(this.#users.entries())
    .map((userArray) => {
      // Id como primeiro elemento
      const id = userArray[0]
      // Id como segundo elemento
      const data = userArray [1]

      return{
        id,
        ...data,
      }
    })
    // Filtrando os users tem o valor que foi passado dentro de search
    .filter(user => {
      // Mostrando apenas os possuem os valores
      if (search) {
        return user.name.includes(search)
      }
      // Se nenhum contiver os valores, ele vai retornar todos normalmente
      return true
    })
  }
  //função para criar
  create(user) {
    const userId = randomUUID()

    this.#users.set(userId, user)
  }
  //função para atualizar
  update(id, user) {
    this.#users.set(id, user)
  }
  //função para deletar
  delete(id, user) {
    this.#users.delete(id)
  }
}
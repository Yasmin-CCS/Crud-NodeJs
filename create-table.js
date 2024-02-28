import {sql} from './db.js'

sql `
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  password TEXT
);
`.then(() => {
  console.log('Tabela criada!')
})
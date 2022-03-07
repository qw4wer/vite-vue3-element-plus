import store2 from "store2"

const db = {};

db.set = (key, value) => {
  store2(key, value)
}


db.get = (key) => {
  return store2(key)
}

db.remove = (key)=>{
  store2.remove(key)
}


export default db

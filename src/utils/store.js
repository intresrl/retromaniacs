import { openDB } from "idb"

const name = "retromaniacs"
const store = "retrospectives"
const version = 1

const getDb = async () => {

  const db = await openDB(name, version, {
    upgrade(db) {
      db.createObjectStore(store);
    }
  })

  return db
}

export const load = async () => {
  const db = await getDb()
  return await db.getAll(store)
}


export const save = async (retro) => {
  const db = await getDb()
  const retroId = retro.name
  await db.put(store, retro, retroId);
}

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
  const stuff =await db.getAll(store);

  console.log(stuff)
  return stuff
}


export const save = async (sections) => {
  const db = await getDb()
  const retroId = "questa"
  const retro = {
    name: retroId,
    date: new Date(),
    sections
  }
  await db.put(store, retro, retroId);

}

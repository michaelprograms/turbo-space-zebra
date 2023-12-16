import Dexie from 'dexie';

export const db = new Dexie('maps');
db.version(1).stores({
  maps: '++id, name, width, height, created, edited' // Primary key and indexed props
});
console.log('db', db);
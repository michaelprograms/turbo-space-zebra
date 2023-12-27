import Dexie from 'dexie';

export const db = new Dexie('userdata');
db.version(1).stores({
  maps: '++id, name, width, height, created, edited, data',
});
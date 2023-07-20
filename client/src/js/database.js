import { openDB } from 'idb';

const initdb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        }
      },
    });
    console.log('jate database ready');
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

export const putDb = async (content) => {
  try {
    console.log('Post to the database');

    // Create a connection to the database and version we want to use.
    const jateDb = await initdb();

    // Create a new transaction and specify the database and data privileges.
    const tx = jateDb.transaction('jate', 'readwrite');

    // Open up the desired object store.
    const store = tx.objectStore('jate');

    // Use the .add() method on the store and pass in the content.
    const request = store.put({ value: content });

    // Get confirmation of the request.
    const result = await request;
    console.log('Data saved to the database', result);
    return result;
  } catch (error) {
    console.error('Error putting data into the database:', error);
    throw error;
  }
};

// Export a function we will use to GET data from the database.
export const getDb = async () => {
  try {
    console.log('GET from the database');

    // Create a connection to the database and version we want to use.
    const jateDb = await initdb();

    // Create a new transaction and specify the database and data privileges.
    const tx = jateDb.transaction('jate', 'readonly');

    // Open up the desired object store.
    const store = tx.objectStore('jate');

    // Use the .get() method to get data with the specified ID (1 in this case).
    const request = store.get(1);

    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('Error getting data from the database:', error);
    throw error;
  }
};

// Call initdb to ensure the database is initialized when the module is imported.
initdb();
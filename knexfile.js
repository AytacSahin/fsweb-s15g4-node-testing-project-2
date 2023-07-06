// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/development.db3'
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullDefault: true,
    // freign_key kontrolünü, her bir tablodaki foreign key'lerin birbirini görebilmesi ve devreye almak için aşağıdaki kod gerekli:
    // eğer söz konusu "pool" bölümünü yapmazsak, her bir tablo birbirinden bağımsız tablolar olarak algılanacaktır.
    pool: {
      afterCreate: (conn, done) => {
        // sqlite engine'e bağlandığımızda aşağıdaki kod çalışacak:
        conn.run('PRAGMA foreign_keys = ON', done); // foreign_key kullanımını açmaya zorlayacak
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.db3'
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullDefault: true,
    // freign_key kontrolünü, her bir tablodaki foreign key'lerin birbirini görebilmesi ve devreye almak için aşağıdaki kod gerekli:
    // eğer söz konusu "pool" bölümünü yapmazsak, her bir tablo birbirinden bağımsız tablolar olarak algılanacaktır.
    pool: {
      afterCreate: (conn, done) => {
        // sqlite engine'e bağlandığımızda aşağıdaki kod çalışacak:
        conn.run('PRAGMA foreign_keys = ON', done); // foreign_key kullanımını açmaya zorlayacak
      },
    },
  }

};

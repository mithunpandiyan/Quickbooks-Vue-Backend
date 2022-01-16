const { createPool } = require("mysql");
const { host, user, password, database, dialect } = process.env;

const pool = createPool({ host, user, password, database, dialect });

pool.getConnection((err, connection) => {
  if (!err) {
    console.log("Database pool connected");
    connection.release();
  } else {
    console.log("Pool Connection Error: " + err);
  }
});

module.exports = (query, args = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (!err && connection) {
        connection.query(query, args, (err, results) => {
          if (!err && results) resolve(results);
          else reject(err);
        });
        connection.release();
      } else {
        reject(err);
      }
    });
  });
};

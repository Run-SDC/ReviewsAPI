const {Pool, Client} = require('pg')

const pool = new Pool({
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  user: 'josh',
  port: 5432,
  database: 'reviews',
  logging: false
});

// async function test() {
//   try {
//     await pool.query(`SELECT * FROM reviews WHERE id = 1`, (err, res) => {
//       if (err) {
//         console.log('SELECT pool.query() Error:', err)
//         return err
//       }
//       if (res) {
//         console.log('SELECT pool.query():', res.rows[0])
//         return res;
//       }
//     })
//   } catch (err) {
//     console.log('SELECT pool.query():', err)
//   }

// };

let test = function(cb) {
  pool.query(`SELECT * FROM reviews WHERE id = 1`, (err, res) => {
    if (err) {
      console.log('SELECT pool.query() Error:', err)
      return err
    }
    if (res) {
      console.log('SELECT pool.query():', res.rows[0])
      cb(res.rows[0]);
      return res;
    }
  })
}

module.exports = {test};
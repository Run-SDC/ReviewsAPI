
const pgp = require('pg-promise')();

const connect = {
  host: 'localhost',
  dialect: 'postgres',
  password: '',
  user: 'josh',
  port: 5432,
  database: 'reviews',
  logging: false
}

const db = pgp(connect);


const compilePhotos() {
  //for review_id in
  let entries = //db length
  //for each review entry
    //query photos to json
    //store as array of objects
    //insert into reviews
  let query = `SELECT row_to_json(id, url) FROM review_photos WHERE review_id = ${i}`
}

const convertDate() {

}


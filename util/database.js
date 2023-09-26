// const mongodb = require('mongodb');
// const uri = "mongodb://localhost:27017/DataBase"

// const MongoClient = mongodb.MongoClient;

// let _db ;

// const mongoConnect= (callback) => {
//   MongoClient.connect(uri)
//   .then( client => {
//   console.log("successful connection");
//   _db = client.db();
//   callback();
//   }
//   ).
//   catch(err=>{
//     console.log(err);
//     throw err;
//   });

// }

// const getDb = ()=>{
//   if(_db){
//     return _db;
//   }
//   throw 'No database found!';
// }

// exports.mongoConnect = mongoConnect ;
// exports.getDb = getDb;

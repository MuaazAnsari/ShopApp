const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/shop"; // Replace with your MongoDB Compass connection string

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(client => {
        console.log("Connected to MongoDB Compass!");
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database connection found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;






















// Code for MONGODB Atlas

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// let _db;
// const mongoConnect = (callback) => {
//     MongoClient.connect(
//         "mongodb+srv://muaaz:Muaazusesmongodb@mycluster.fql9zuc.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"
//       )
//         .then(client => {
//           console.log("Connected");
//           _db = client.db();
//           callback();
//         })
//         .catch((err) => {
//             console.log(err);
//             throw err;
//         });
// };

// const getDb = () => {
//     if(_db){
//         return _db;
//     }
//     throw 'No Database connection found!';
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;












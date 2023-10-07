const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB_LOCAL_CONNECTION_STRING;

const MongoDbConnection = mongoose
    .createConnection(connectionString)
    .on('open', () => {
        console.log('Connected to MongoDB Local');
    })
    .on('error', () => {
        console.log('MongoDB Error!');
    });

module.exports = MongoDbConnection;
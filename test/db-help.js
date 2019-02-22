const mongoose = require('mongoose');

function isMongooseModel(item) {
    return typeof item === 'function' && item.name === 'model';
}

const connect = () =>
    mongoose
        .connect('mongodb://localhost:27017/rebus-test', {
            config: {
                autoIndex: false,
            },
            useNewUrlParser: true,
        });

const disconnect = () => mongoose.disconnect();

const dropCollection = item =>
    new Promise((resolve, reject) => {
        const collectionName = isMongooseModel(item) ? item.collection.collectionName : item;
        return mongoose.connection.db.collection(collectionName, { strict: true }, (err, result) => {
            // collection does not exist
            if (err) return resolve();

            return result.deleteMany(e => (e ? reject(e) : resolve()));
        });
    });

const dropCollections = (...collections) => Promise.all(collections.map(item => dropCollection(item)));

module.exports = {
    connect,
    disconnect,
    dropCollection,
    dropCollections,
};

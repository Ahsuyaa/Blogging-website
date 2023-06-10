import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  const uri = process.env.MONGO_URL
  const db = mongoose.connect(uri, options);
  console.log('new connection');
  connection.isConnected = db

  if (!uri) {
    throw new Error('Add your Mongo URI to .env');
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}
const db_export = { connect, disconnect };
export default db_export;
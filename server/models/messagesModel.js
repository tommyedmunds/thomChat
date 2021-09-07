const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myURI =
  'mongodb+srv://tommyedmunds:starwars123@cluster0.xnkb6.mongodb.net/ThomChat?retryWrites=true&w=majority';

const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    dbName: 'ThomChat',
  })
  .then(() => {
    console.log('connected to mongo db');
  })
  .catch((err) => console.log(err));

const message = new Schema(
  {
    item: { type: String },
    created_by: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('message', message);

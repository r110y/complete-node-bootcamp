const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Established'));

// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);

// IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE EXISTING DATA FROM COLLECTION

importData();

const deleteDataFromCollection = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[3] === '--import') {
  importData();
  console.log('Data imported successfully');
  process.exit();
} else if (process.argv[2] === '--delete') {
  deleteDataFromCollection();
}

const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect( process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

connectToDatabase();

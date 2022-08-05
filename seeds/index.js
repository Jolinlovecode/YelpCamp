const mongoose = require('mongoose');
const cities  = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
  console.log("MONGO CONNECTION OPEN!");
})
.catch(err => {
  console.log("Error, MONGO CONNECTION!!");
  console.log(err);
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 15; i++) {
    const random15 = Math.floor(Math.random() * 15);
    const camp = new Campground({
      location: `${cities[random15].city}, ${cities[random15].state}`,
      title: `${sample(descriptors)} ${sample(places)}`
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
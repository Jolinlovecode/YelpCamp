const mongoose = require('mongoose');
const cities  = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
  console.log("MONGO CONNECTION OPEN!");
})
.catch(err => {
  console.log("Error, MONGO CONNECTION!!");
  console.log(err);
})

 // call unsplash and return small image
 async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'SaigZfpcGCMiGSlXoGfTwmntcEa8a6vxhP3Q2u7Gji4',
        collections: 1114848,
      },
    })
    return resp.data.urls.small;
  } catch (err) {
    console.error(err)
  }
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 15; i++) {
    // setup
    const random15 = Math.floor(Math.random() * 15);
    const price = Math.floor(Math.random() * 20) + 10;

    // const placeSeed = Math.floor(Math.random() * places.length)
    // const descriptorsSeed = Math.floor(Math.random() * descriptors.length)
    // const citySeed = Math.floor(Math.random() * cities.length)

    // seed data into campground
    const camp = new Campground({
      author: '6314d201096263353c00f45e',
      location: `${cities[random15].city}, ${cities[random15].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
      // location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
      // image: await seedImg(),
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202]
    },
      images: [
        {
          url: 'https://res.cloudinary.com/dfqsfweeu/image/upload/v1663045863/YelpCamp/aziq357nxnuuxettxxiw.jpg',
          filename: 'YelpCamp/aziq357nxnuuxettxxiw'
        },
        {
          url: 'https://res.cloudinary.com/dfqsfweeu/image/upload/v1663045863/YelpCamp/frpqmvx3t4bgetj1egna.jpg',
          filename: 'YelpCamp/frpqmvx3t4bgetj1egna'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
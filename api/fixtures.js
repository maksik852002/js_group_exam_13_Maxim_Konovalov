const mongoose = require("mongoose");
const config = require("./config");
const User = require("./models/User");
const Photo = require("./models/Photo");
const Place = require("./models/Place");
const Review = require("./models/Review");
const nanoid = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, user2, user3, admin] = await User.create(
    {
      username: "user",
      password: "123",
      token: nanoid(),
    },
    {
      username: "user2",
      password: "123",
      token: nanoid(),
    },
    {
      username: "user3",
      password: "123",
      token: nanoid(),
    },
    {
      username: "admin",
      password: "123",
      role: 'admin',
      token: nanoid(),
    }
  );

  const [place1, place2, place3, place4] = await Place.create(
    {
      user: user,
      title: "Sunken Flagon",
      description: 'A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.',
      image: "uploads/fixtures/vesna.jpg"
    },
    {
      user: user2,
      title: "The Broken Sword",
      description: 'A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.',
      image: "uploads/fixtures/camera.jpg"
    },
    {
      user: user3,
      title: "The Bannered Mare",
      description: 'A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.',
      image: "uploads/fixtures/moto.jpg"
    },
    {
      user: user2,
      title: "Hog's Head",
      description: 'A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.',
      image: "uploads/fixtures/zakat.jpg"
    },
  );

  await Photo.create(
    {
      place: place2,
      user: user,
      image: "uploads/fixtures/vesna.jpg",
    },
    {
      place: place1,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      place: place1,
      user: user,
      image: "uploads/fixtures/city.jpg",
    },
    {
      place: place2,
      user: user2,
      image: "uploads/fixtures/moto.jpg",
    },
    {
      place: place1,
      user: user3,
      image: "uploads/fixtures/wolf.jpg",
    },
    {
      place: place3,
      user: user2,
      image: "uploads/fixtures/zakat.jpg",
    },
    {
      place: place4,
      user: user3,
      image: "uploads/fixtures/abstract.jpg",
    },
    {
      place: place3,
      user: user2,
      image: "uploads/fixtures/fog.jpg",
    },
    {
      place: place4,
      user: user2,
      image: "uploads/fixtures/fog.jpg",
    },
    {
      place: place3,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      place: place2,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      place: place1,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      place: place1,
      user: user2,
      image: "uploads/fixtures/zakat.jpg",
    },
    {
      place: place3,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      place: place2,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      place: place4,
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    }
  );

  await Review.create(
    {
      place: place2,
      user: user,
      comment: "A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.",
      qualityOfFood: 1,
      serviceQuality: 3,
      interior: 3
    },
    {
      place: place1,
      user: user3,
      comment: "A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.",
      qualityOfFood: 5,
      serviceQuality: 4,
      interior: 4
    },
    {
      place: place1,
      user: user,
      comment: "A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.",
      qualityOfFood: 5,
      serviceQuality: 4,
      interior: 2
    },
    {
      place: place3,
      user: user2,
      comment: "A night club located on Omega, featuring exotic Asari dansers, automated and live barmen, wide variety of all-species compatible drinks.",
      qualityOfFood: 3,
      serviceQuality: 3,
      interior: 4
    },
  );

  mongoose.connection.close();
};

run().catch((e) => {
  mongoose.connection.close();
  throw e;
});

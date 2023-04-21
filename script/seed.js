'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

const userData = [
  {
    name: 'admin',
    password: 'password',
    email: 'admin@email.com',
    isAdmin: true,
  },
  {
    name: 'Wayland Riccardini',
    password: 'kW0c2CgX',
    email: 'wriccardini0@salon.com',
    isAdmin: false,
  },
  {
    name: 'Ginevra Paget',
    password: '69Inn12m5Y',
    email: 'gpaget1@ucoz.com',
    isAdmin: false,
  },
  {
    name: 'Corine Ick',
    password: 'xirjMG',
    email: 'cick2@icq.com',
    isAdmin: false,
  },
  {
    name: 'Fiorenze Nolleth',
    password: 'VqpEsuGj19LC',
    email: 'fnolleth3@devhub.com',
    isAdmin: false,
  },
  {
    name: 'Cory Wilkerson',
    password: '2GoZw2',
    email: 'cwilkerson4@dot.com',
    isAdmin: false,
  },
  {
    name: 'Carleen McKenny',
    password: 'ebXscay8',
    email: 'cmckenny5@jigsy.com',
    isAdmin: false,
  },
  {
    name: 'Winifred Clohissy',
    password: 'ABboI5wQT',
    email: 'wclohissy6@dot.com',
    isAdmin: false,
  },
  {
    name: 'Quincey Durston',
    password: 'OoKMQPnY3E8v',
    email: 'qdurston7@cargocollective.com',
    isAdmin: false,
  },
  {
    name: 'Vittorio Querrard',
    password: 'voF9tVPW',
    email: 'vquerrard8@webs.com',
    isAdmin: false,
  },
  {
    name: 'Efren Mayward',
    password: 'PddmuMBXuxG',
    email: 'emayward9@discovery.com',
    isAdmin: false,
  },
];

const productData = [
  {
    name: 'No7 Protect and Perfect Foundation Sunscreen Broad Spectrum SPF 15 Deeply Beige',
    price: 99.39,
    quantity: 5,
    description: 'Sharable fresh-thinking standardization',
  },
  {
    name: 'Kogenate FS',
    price: 58.17,
    quantity: 5,
    description: 'Universal intangible utilisation',
  },
  {
    name: 'Nitrous Oxide',
    price: 84.19,
    quantity: 3,
    description: 'Right-sized high-level capacity',
  },
  {
    name: 'Amoxicillin and Clavulanate Potassium',
    price: 35.31,
    quantity: 2,
    description: 'Persevering neutral middleware',
  },
  {
    name: 'Amitriptyline Hydrochloride',
    price: 70.87,
    quantity: 8,
    description: 'Reverse-engineered systematic application',
  },
  {
    name: 'Viramune',
    price: 25.55,
    quantity: 5,
    description: 'Cloned 24 hour challenge',
  },
  {
    name: 'Levoxyl',
    price: 67.09,
    quantity: 7,
    description: 'Team-oriented tertiary open system',
  },
  {
    name: 'ANTI BACTERIAL HAND SANITIZER',
    price: 74.45,
    quantity: 4,
    description: 'Profound user-facing archive',
  },
  {
    name: 'Cepacol',
    price: 69.11,
    quantity: 4,
    description: 'Enterprise-wide non-volatile portal',
  },
  {
    name: 'Tramapap',
    price: 73.61,
    quantity: 5,
    description: 'Versatile 24 hour frame',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all(
    userData.map((user) => {
      return User.create(user);
    })
  );

  // Creating Products
  const products = await Promise.all(
    productData.map((product) => {
      return Product.create(product);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

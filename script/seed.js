"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

const userData = [
  {
    fullName: "admin",
    password: "password",
    email: "admin@email.com",
    isAdmin: true,
  },
  {
    fullName: "Wayland Riccardini",
    password: "kW0c2CgX",
    email: "wriccardini0@salon.com",
    isAdmin: false,
  },
  {
    fullName: "Ginevra Paget",
    password: "69Inn12m5Y",
    email: "gpaget1@ucoz.com",
    isAdmin: false,
  },
  {
    fullName: "Corine Ick",
    password: "xirjMG",
    email: "cick2@icq.com",
    isAdmin: false,
  },
  {
    fullName: "Fiorenze Nolleth",
    password: "VqpEsuGj19LC",
    email: "fnolleth3@devhub.com",
    isAdmin: false,
  },
  {
    fullName: "Cory Wilkerson",
    password: "2GoZw2",
    email: "cwilkerson4@dot.com",
    isAdmin: false,
  },
  {
    fullName: "Carleen McKenny",
    password: "ebXscay8",
    email: "cmckenny5@jigsy.com",
    isAdmin: false,
  },
  {
    fullName: "Winifred Clohissy",
    password: "ABboI5wQT",
    email: "wclohissy6@dot.com",
    isAdmin: false,
  },
  {
    fullName: "Quincey Durston",
    password: "OoKMQPnY3E8v",
    email: "qdurston7@cargocollective.com",
    isAdmin: false,
  },
  {
    fullName: "Vittorio Querrard",
    password: "voF9tVPW",
    email: "vquerrard8@webs.com",
    isAdmin: false,
  },
  {
    fullName: "Efren Mayward",
    password: "PddmuMBXuxG",
    email: "emayward9@discovery.com",
    isAdmin: false,
  },
];

const productData = [
  {
    name: "Oujia Board",
    price: 99.39,
    quantity: 5,
    description: "Sharable fresh-thinking standardization",
    image:
      "https://t3.ftcdn.net/jpg/02/12/15/00/360_F_212150079_pQYUSIT892zObwFeIprQIsFV7IefzlZf.jpg",
  },
  {
    name: "Kogenate FS",
    price: 58.17,
    quantity: 5,
    description: "Universal intangible utilisation",
    image:
      "https://i0.wp.com/glhf.org/wp-content/uploads/2020/09/amulate-bottles-re-sized.jpg?resize=668%2C335&ssl=1",
  },
  {
    name: "Nitrous Oxide",
    price: 84.19,
    quantity: 3,
    description: "Right-sized high-level capacity",
    image: "https://motoarzt.in/wp-content/uploads/2020/06/1-1-1024x683.jpg",
  },
  {
    name: "Amoxicillin and Clavulanate Potassium",
    price: 35.31,
    quantity: 2,
    description: "Persevering neutral middleware",
    image:
      "https://www.advacarepharma.com/wp-content/uploads/2017/10/amoxicillin-clavulanic-acid-tablets-1.jpg",
  },
  {
    name: "TELESCOPE",
    price: 70.87,
    quantity: 8,
    description: "Reverse-engineered systematic application",
    image:
      "https://o.aolcdn.com/hss/storage/midas/160e9e4992a706834b2b80e895a37751/201905823/hubble_in_orbit1-960-jt.jpg",
  },
  {
    name: "VIKING HAT",
    price: 25.55,
    quantity: 5,
    description: "Cloned 24 hour challenge",
    image:
      "https://w7.pngwing.com/pngs/1006/147/png-transparent-viking-helmet-helmet-mask-halloween-headgear.png",
  },
  {
    name: "DINOSAUR EGG",
    price: 67.09,
    quantity: 7,
    description: "Team-oriented tertiary open system",
    image:
      "https://as2.ftcdn.net/jpg/05/80/04/51/220_F_580045158_ADyspJN2GfTdkdBrbwayGurf56q966KO.jpg",
  },
  {
    name: "ANTI BACTERIAL HAND SANITIZER",
    price: 74.45,
    quantity: 4,
    description: "Profound user-facing archive",
    image:
      "https://image.made-in-china.com/202f0j00LaTUDFnlJNpu/Ce-OEM-Sterilization-OEM-75-Ethanol-Alcohol-Antibacterial-Hand-Sanitizers.jpg",
  },
  {
    name: "ALIEN",
    price: 69.11,
    quantity: 4,
    description: "Enterprise-wide non-volatile portal",
    image:
      "https://images.fineartamerica.com/images-medium-large-5/alien-head-sciepro.jpg",
  },
  {
    name: "MILK AND COOKIES",
    price: 73.61,
    quantity: 5,
    description: "Versatile 24 hour frame",
    image: "https://static.emerils.com/IMG_6999.jpg",
  },
  {
    name: "Bose QuietComfort 35 II Wireless Bluetooth Headphones",
    price: 299.99,
    quantity: 10,
    description: "Noise-cancelling headphones with Alexa voice control",
    image:
      "https://cdn.mos.cms.futurecdn.net/AFWRzeeXLNuq6Uk4jnpMT6-1200-80.jpg",
  },
  {
    name: "Apple iPhone 13 Pro Max",
    price: 1099.0,
    quantity: 3,
    description: "Super Retina XDR display with ProMotion",
    image:
      "https://www.eastasiaeg.com/media/catalog/product/cache/7cc761d78ccccdcc12015db63d803651/1/-/1-iphone-13-pro-max-graphite_1.jpg",
  },
  {
    name: "Samsung QN90A Neo QLED 4K Smart TV",
    price: 2199.99,
    quantity: 2,
    description: "Quantum Matrix Technology with 120Hz refresh rate",
    image: "https://cdn.mos.cms.futurecdn.net/UJLkVDdFM4AuJWawATR4LT.jpg",
  },
  {
    name: "Nintendo Switch OLED Model",
    price: 349.99,
    quantity: 8,
    description: "7-inch OLED screen with enhanced audio and storage",
    image:
      "https://media.wired.com/photos/5e43348e6fd0760009425807/191:100/w_2580,c_limit/Gear-SW_PlayStand_1__25146.1488586958.jpg",
  },
  {
    name: "Sennheiser HD 660 S Open-Back Headphones",
    price: 499.95,
    quantity: 4,
    description: "High-end audiophile headphones with balanced sound",
    image:
      "https://preview.redd.it/5dilcw6oc7i31.jpg?width=3016&format=pjpg&auto=webp&s=1ec8bc1292eae70c7756d8f81da0c70574efd078",
  },
  {
    name: "Dyson Cyclone V10 Absolute Cordless Vacuum",
    price: 549.99,
    quantity: 6,
    description: "Powerful suction and up to 60 minutes of run time",
    image:
      "https://www.newegg.com/insider/wp-content/uploads/2018/06/dyson_cyclone_3-1024x576.jpg",
  },
  {
    name: "Sony Alpha 7R IV Mirrorless Camera",
    price: 2999.99,
    quantity: 1,
    description: "61-megapixel full-frame sensor with 4K video recording",
    image: "https://cdn.mos.cms.futurecdn.net/NAzqcRybLaJEphhZBgDvFj.jpg",
  },
  {
    name: "Apple Watch Series 7",
    price: 399.0,
    quantity: 9,
    description: "Always-on Retina display and advanced health features",
    image:
      "https://www.zdnet.com/a/img/2021/11/02/3fb8411f-1bcc-47cd-99e2-bb3fb393f34b/apple-watch-series-7-3.jpg",
  },
  {
    name: "Nikon D850 DSLR Camera",
    price: 3299.99,
    quantity: 1,
    description: "45.7-megapixel full-frame sensor with 4K UHD video recording",
    image:
      "https://www.thephoblographer.com/wp-content/uploads/2017/10/Chris-Gampat-The-Phoblographer-Nikon-D850-review-product-images-10.jpg",
  },
  {
    name: "SWORD",
    price: 299.0,
    quantity: 4,
    description: "360-degree sound and up to 16 hours of battery life",
    image:
      "https://img3.wikia.nocookie.net/__cb20131217130213/finalfantasy/images/a/ac/Brotherhood_LRXIII.jpg",
  },
  {
    name: "POTION",
    price: 599.99,
    quantity: 5,
    description: "High-performance mixer with 6-quart stainless steel bowl",
    image:
      "https://i.etsystatic.com/18026541/r/il/5de31b/1729587793/il_fullxfull.1729587793_rafo.jpg",
  },
  {
    name: "3D PRINTER",
    price: 1599.99,
    quantity: 3,
    description:
      "17.3-inch display with 144Hz refresh rate and NVIDIA GeForce RTX 3070 GPU",
    image:
      "https://www.popsci.com/uploads/2023/04/13/best-3d-printer-for-beginners-anycubic.jpg?auto=webp",
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

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
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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

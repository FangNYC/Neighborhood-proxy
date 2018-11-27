const localHost = `http://localhost:3100`;
const cloudHost = `http://mysterious-earth-97891.herokuapp.com`;

// export const host =
//   process.env.NODE_ENV === 'development' ? localHost : cloudHost;

const services = [
  {
    name: 'neighbordhood',
    url: 'http://localhost:3001/',
    styles: '<link rel="stylesheet" href="http://localhost:3001/styles.css" />',
    script: '<script src="http://localhost:3001/app.js"></script>'
  },
  // {
  //   name: 'reviews',
  //   url: 'http://18.224.94.179/',
  //   styles: '<link rel="stylesheet" href="http://18.224.94.179/styles.css" />',
  //   script: '<script src="http://18.224.94.179/bundle.js"></script>',
  // }
];

module.exports.services = services;
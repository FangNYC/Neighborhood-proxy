const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const parser = require("body-parser");
const app = express();
const cors = require('cors');

const port = 7000;

// const { template } = require('./template');
const { services } = require('./configs');

app.use(parser.json());
app.use(morgan('dev'));
app.use(cors())
app.use(express.static(path.join(__dirname, '/public')));

// Neighborhood API endpoints
app.get('/listingdata', (req, res) => {
  let requestId = req.query.id;
  console.log('REQ id TO listingdata api', requestId);
  requestId = requestId.slice(-3) * 1;
  axios.get(`http://localhost:3001/listingdata?id=${requestId}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/neighborhooddata', (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios.get(`http://localhost:3001/neighborhooddata?id=${requestId}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/landmarkdata', (req, res) => {
  let lat = req.query.listingLat;
  let long = req.query.listingLong;
  axios.get(`http://localhost/landmarkdata?listingLat=${lat}&listingLong=${long}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

// Add STACY's API endpoints
// app.get('/ratings', (req, res) => {
//   axios.get(`http://18.218.27.164${req.url}`)
//     .then((results) => {
//       // console.log(results.data);
//       res.send(results.data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.send();
//     });
// });

// app.get('/reviews', (req, res) => {
//   axios.get(`http://18.218.27.164${req.url}`)
//     .then((results) => {
//       // console.log(results.data);
//       res.send(results.data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.send();
//     });
// });

// app.get('/search', (req, res) => {
//   axios.get(`http://18.218.27.164${req.url}`)
//     .then((results) => {
//       // console.log(results.data);
//       res.send(results.data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.send();
//     });
// });

// // Add Dev's API endpoints
// app.get('/description', (req, res) => {
//   axios.get(`http://52.14.238.117${req.url}`)
//     .then((results) => {
//       res.send(results.data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.send();
//     });
// });

// // Add Louis's API endpoints
// app.get('/bookinglisting/:id', (req, res)=>{ 
//   let id = req.params.id
//   axios.get(`http://18.216.104.91/bookinglisting/${id}`)
//   .then((results) => {
//     res.send(results.data)
//   })
//   .catch((err) => {
//     console.error(err)
//   });
// })

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

// app.get('/rooms/:id', function(req, res) {
//   const id = req.params.id;
//   console.log('REQ TO PROXY', id)
//   console.log(services[0].url)
//   axios
//     .get(`${services[0].}/getRoom/${id}`)
//     .then(
//       ({
//         data: { initialState, nav, modal, description, gallery, relatedListings }
//       }) => {
//         const html = template(
//           initialState,
//           nav,
//           modal,
//           description,
//           gallery,
//           relatedListings
//         );
//         res.status(200).send(html);
//       }
//     )
//     .catch(e => console.log('there is an error!', e));
// });

// Neighborhood API endpoints
// app.get('/rooms/:id', function(req, res) {
//   const id = req.params.id;
//   axios
//     .get(`http://localhost:3001/listingdata${id}`)
//     .then((response) => {
//       res.send(response.data)
//     })
//     .catch(e => console.log('there is an error!', e));
// });

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
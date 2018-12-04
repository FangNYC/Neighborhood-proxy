const express = require('express');
const path = require('path');
const axios = require('axios');
const parser = require("body-parser");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const LOADER_CONFIG_KEY = process.env.loaderConfigKey;
const { services } = require('./configs');

const port = process.env.PORT || 7000;

app.use(morgan('dev'));
app.use(parser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '/public')));

// Ratings API 
app.get('/ratings', (req, res) => {
  axios.get(`http://ec2-18-217-147-14.us-east-2.compute.amazonaws.com${req.url}`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.error(err);
      res.send();
    });
});

app.get('/reviews', (req, res) => {
  axios.get(`http://ec2-18-217-147-14.us-east-2.compute.amazonaws.com${req.url}`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.error(err);
      res.send();
    });
});

app.get('/search', (req, res) => {
  axios.get(`http://ec2-18-217-147-14.us-east-2.compute.amazonaws.com${req.url}`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.error(err);
      res.send();
    });
});

// Description API
app.get('/description', (req, res) => {
  axios.get(`http://167.99.20.35:4000${req.url}`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.error(err);
      res.send();
    });
});

// Loader.io access key
app.get(`/${LOADER_CONFIG_KEY}`, (req, res) => {
  res.send(`${LOADER_CONFIG_KEY}`)
})

// Test route
app.get('/test', (req, res) => {
  res.send('Test - proxy')
})

// Public endpoint
app.get('/listing', (req, res) => {
  Promise.all([
    axios.get('http://ec2-3-17-56-15.us-east-2.compute.amazonaws.com/renderNeighborhood', {
      params: {
        id: req.query.id
      }
    })
  ])
  .then((results) => {
    let strings = [];
    let props = [];
    results.forEach(({data}) => {
      strings.push(data[0]);
      props.push(data[1]);
    });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Staybnb</title>
        <!-- <link rel="stylesheet" type="text/css" href="http://ec2-3-17-56-15.us-east-2.compute.amazonaws.com/styles.css"> -->
      </head>
      <body>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/styles.css">
        <link type="text/css" rel="stylesheet" href="http://ec2-54-209-75-211.compute-1.amazonaws.com/guestBar.css">
        <link type="text/css" rel="stylesheet" href="http://ec2-18-217-147-14.us-east-2.compute.amazonaws.com/style.css">        
        <div id="description"></div>
        <div class="container-left">
            <div id="reviews"></div>
            <div id="neighborhood">${strings[0]}</div>
        </div>
        <div class=container-right>
          <div id="booking"></div>
        </div>
        <script src="http://167.99.20.35:4000/bundle.js"></script>
        <script src="http://ec2-54-209-75-211.compute-1.amazonaws.com/bundle.js"></script>
        <script src="http://ec2-18-217-147-14.us-east-2.compute.amazonaws.com/bundle.js"></script>
        <script>
          ReactDOM.render(
            React.createElement(Reviews),
            document.getElementById('reviews')
          );
        </script>
      </body>
      </html>
    `)
  })
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
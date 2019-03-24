// server.js
// BASE SETUP
// =============================================================================
// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const fs = require('fs');

const images = [];
const imagesPath = './public/images';

fs.readdir(imagesPath, (err, files) => {
    files.forEach(file => {
        console.log(file);
        images.push(file);
    });
    console.log("1 image size: "+ images.length)
    setupTheServer()
});

const setupTheServer = () =>
{
    app.use(express.static('public'));
// configure app to use bodyParser()
// this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const port = process.env.PORT || 3030;        // set our port

// ROUTES FOR OUR API
// =============================================================================
    const router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', (req, res) => {
        console.log('Request made to home page @ /');
        //res.json({ message: 'hooray! welcome to our api!' });
        console.log("2 image size: "+ images.length)
        const imageUrls = images.map( image => {
            const imageUrl = `http://localhost:${port}/images/${image}`
            console.log ( imageUrl );;
            return imageUrl;
        });
        res.json(imageUrls);
    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
    app.use('/api', router);

// START THE SERVER
// =============================================================================
    app.listen(port);
    console.log('Magic happens on port ' + port);
}


const path = require('path');
const express = require('express');
const request = require('request');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000; 
const app = express();       
 
app.use(express.static(publicPath));
app.set('view engine', 'ejs');        
  
app.get('/', function (req, res) {    
 
    const url = 'https://restcountries.eu/rest/v2/all';
    request(url, function (err, response, body) { 
        if (err) {
            res.render('index', {data: null, error: 'Error, please try again'});
        } else {
            let data = JSON.parse(body);
            res.render('index', {data: data, error: null}); 
            //console.log('Number of countries', data.length); //250;
        }
    });  
});
 
app.get('/:name', function (req, res) {
    let countryName = req.params.name;
    let url = `https://restcountries.eu/rest/v2/name/${countryName}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('country', {data: null, error: 'Error, please try again'});
        } else {
            let data = JSON.parse(body);
            res.render('country', {data: data, error: null}); 
            //console.log('Number of country', data.length)
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
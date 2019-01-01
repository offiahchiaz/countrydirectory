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
    request(url, (err, response, body) => { 
        if (err) {
            res.render('index', {data: null, error: 'Unable to connect to the REST Countries Server'});
        } else {
            let data = JSON.parse(body);
            res.render('index', {data: data, error: null}); 
        }
    });  
});
 
app.get('/:name', function (req, res) {
    let countryName = encodeURIComponent( req.params.name); 
    console.log(countryName)
    let url = `https://restcountries.eu/rest/v2/name/${countryName}`
    request(url, (err, response, body) => {
        if (err) {
            res.render('country', {data: null, error: 'Unable to connect to the REST Countries Server'});
        } else {
            let data = JSON.parse(body);
            res.render('country', {data: data, error: null}); 
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
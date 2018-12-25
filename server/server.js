const path = require('path');
const express = require('express');
const request = require('request');

//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;
const app = express();    
 
app.set('view engine', 'ejs');   

app.get('/', function (req, res) {   
 
    const url = 'https://restcountries.eu/rest/v2/all';
    request(url, function (err, response, body) { 
        if (err) {
            res.render('index', {data: null, error: 'Error, please try again'});
        } else {
            let data = JSON.parse(body);
            res.render('index', {data: data, error: null}); 
        }
    });  
});

//app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
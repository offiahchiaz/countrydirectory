const path = require('path');
const express = require('express');
const request = require('request');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(publicPath));

request.get("https://restcountries.eu/rest/v2/name/nigeria", function (err, res, body) {
    if (err && response.statusCode === 404) {
        return console.log(err);
    }

    console.log(JSON.parse(body));
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
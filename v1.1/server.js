const express = require("express");
const app = express();
//add static for use css
app.use(express.static(__dirname));
var path = require("path");

// add css sendfile
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
//add html sendfile
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/" + "dashboard.css");
});

const port = 4242;

app.listen(port);

console.log("Running at Port " + port);

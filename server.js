//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/index.html'));
});

const port = process.env.PORT || 5000;
const hostname = process.env.HOST || "127.0.0.1";
app.listen(port, hostname, () => {
    console.log(`Admin is running at ${hostname}:${port}`)
});

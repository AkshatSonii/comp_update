var express = require('express');
var app = express();
var fs = require("fs");

const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.post("/gitTrigger", function(req, res){
    data = {}
    data["method"] = "GET"
    res.end(JSON.stringify("git triggerred"));
})

app.get("/", function(req, res){
   data = {}
   data["method"] = "GET"
   res.end(JSON.stringify("Hello"));
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
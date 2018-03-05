
var http = require("http");
var path = require("path");
var fs = require('fs');

var mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.css': 'text/css'
}

http.createServer(onrequest).listen(8000);

function onrequest(req, res) {
  var route = req.url;

  if (route === "/" || route === "/home") {
    res.writeHead(200,{"Content-Type": "text/html"});
    route = "index.html";

   } else if (route === "/about") {
    res.writeHead(200,{"Content-Type": "text/html"});
    route = "about.html";
   } else if (route === "/images/" || route === "/images") {
    res.writeHead(200,{"Content-Type": "text/html"});

    fs.readdir('./static/images/', (err, files) => {
      for (var i = 0; i < files.length; i++){
        res.write("<li>" + files[i]+ "</li>");
      }
    })
    res.write("<h1>Dit zijn alle afbeeldingen die er zijn</h1>");

    route = "/imagelist.html";

   } else if (route == '/images/bulldog.jpg'){
    res.writeHeader(200, {"Content-Type": "image/jpg"});
    route = '/images/bulldog.jpg';

  } else if (route == '/images/bored-dog.jpg'){
    res.writeHeader(200, {"Content-Type": "image/jpg"});
    route = '/images/bored-dog.jpg';

  } else {
    res.writeHead(404,{"Content-Type": "text/html"})
    route = "404.html";
  }

  fs.readFile(path.join("static", route), onread);
  function onread(err, buf) {

    if (err) {
      res.statusCode = 404;
      res.end("not found. \n");
    } else {
      var extension = path.extname(route);
      var type = mime[extension] || 'text/plain';
      res.statusCOde = 200;
      res.end(buf);
    }
  }
}
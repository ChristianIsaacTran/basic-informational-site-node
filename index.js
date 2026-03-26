// import http from  "node:http";
// import fs from "node:fs";

const http = require("node:http");
const fs = require("node:fs");


/* 
.createServer manually creates a server to run the callback function whenever it receives a request

req = the request object. Has details on the type of request made, the url used, etc. 

res = the response object. Used to send responses back to the user based on the request. 
    - response objects use methods like .write and .end to write stuff into the response object, and 
    .end to send it end the response to send it back.
    
    - reponse objects require a response "head" to tell the server what type of response we are sending back. This can be 
    set with .setHeader()

*/
const server = http.createServer((req, res) => {
   console.log("request made detected");
   console.log("URL request given: "+req.url);
   console.log("Type of request received: "+req.method);

    //  setting the response header content-type 
   res.setHeader("Content-Type", "text/html");

   let webFile = "";

    // switch to read the request URL given and set the file based on request URL, with status codes for response object
   switch(req.url) {
    case "/" : 
        webFile = "index.html";
        res.statusCode = 200;
        break;
    
    case "/about":
        webFile = "about.html";
        res.statusCode = 200;
        break; 

    case "/contact-me":
        webFile = "contact-me.html";
        res.statusCode = 200;
        break;

    // redirect case which manually switches user URL location through the response header
    case "/contact":
        res.setHeader("Location", "/contact-me");
        res.statusCode = 301;
        res.end();
        break;

    default: 
        webFile = "404.html";
        res.statusCode = 404;
        break;
   }

//    using the file system module from node.js to read the HTML file, then write it to the response object with res.end() (or I could manually use res.write() to write the HTML file into the response)
   fs.readFile(webFile, (error, data) => {
        if(error) {
            console.log(error);
            res.end();
        } else {
            res.end(data);
        }
        // .end() signals to the server that there is no more data to write and to return the response object 
   });
   
});

// .listen tells the server to actively listen to the port (8080), the domain name (localhost), and the callback function fires on listen startup
server.listen(8080, "localhost", () => {
 console.log("now listening for requests on port 8080");
});
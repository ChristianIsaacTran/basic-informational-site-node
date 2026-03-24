# purpose of this repo

- This is the first project in the node.js portion of the odin project and it goes over how to use general node.js modules and
  methods to setup and basic backend server to listen for requests and send back HTML web pages.

## main objective

- Setup and make 4 html files, then a server.js file named
  "index.js" to route the user to the respective webpage based on
  the URL/request made in the browser.

- Port number we are using is 8080 through localhost (so localhost:8080 in the URL)

- localhost:8080 should respond with index.html

- localhost:8080/about should respond with about.html

- localhost:8080/contact-me should take users to contact-me.html

- 404.html should display whenever the user
  tries to go to any other page not listed above

## About setting up a server in node.js

- Node.js comes with a bunch of built-in modules to create and setup a backend server to listen and respond to.

- To create a server, we need to use ES6 modules to import
  the "node:http" module so that we can use it's ".createServer"
  method which manually creates a server that fires a callback
  function whenever it receives a request, and respond with the response. The callback has two parameters, one request object and one response object.
  - The request parameter contains details on the request itself (like type of request, POST, GET, etc., what the URL was, the request header, etc.)
  - The response parameter is used to actually send a response back

- Once a server is created with the http method ".createServer", we also need to manually "start" the server and tell it to actively listen for a request by using the http method ".listen", which accepts three main parameters:
  - The first parameter is the port number which is the "door" to our host machine to let requests reach the server we created. In this project, the port number we use is 8080, but the port number can be anything as long as the port number isn't already being used by another program on the machine.
  - The second parameter is the domain name, but on a local machine it is called "localhost" by default. I can specify it to be something else if I choose.

  - The third parameter is a function that fires everytime it makes the server start listening for requests.

## Handling requests and sending responses

- running the js file with the server on it and a listener will cause the server to start running and continuously listen to requests on the given domain and port number. Based on the request from the URL given, we can do some basic routing and sending responses back by returning the correct HTML file.

- in the index.js I used a switch case to check the request URL given, which .url returns the url after the main domain name and port. ex: /about

- to send a response, we need to manage the response object which in this case is named "res". The .end method signals to the server
  that there is nothing else to write to the response stream and to
  send the response.

- in the index.js, I used the file system module (fs) to read the local html files and write them to the response stream with either res.write() or directly with res.end().

- responses require response headers which can be manually set with res.setHeader().

- a response also sends a status code as well, which can be set manually with res.statusCode = statusCodeNumber;
  - 200 = successful response
  - 301 = resource moved permanently
  - 404 = resource not found

## Redirects

- One of the cases is a redirect, which sets the status code in the response to 301 and manually changes the URL for the user with
  res.setHeader("Location", "/destination");

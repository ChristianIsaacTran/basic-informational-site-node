// import express from "express";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// need to define __dirname and __filename since they are not native to ES modules, only with commonJS

// returns the absolute path of the current file, AND the filename attached to it
// const __filename = fileURLToPath(import.meta.url);

// returns the absolute path of the current file, WITHOUT the filename
// const __dirname = path.dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

// COMMMON JS import to allow the use of global variable __dirname and __filename
const express = require("express");

// creates an express app
const app = express();

const port = 8080;

const server = app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Listening for requests on port ${port}`);
});

app.get("/", (req, res) => {
  /*
    since we are taking the relative path instead of the absolute path, we need to define in the second parameter 
    what the root of the relative path is. We use the global variable __dirname to get the directory of this and 
    look for index.html through the relative path starting at __dirname.
    */
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact-me", (req, res) => {
  res.sendFile("./contact-me.html", { root: __dirname });
});
 
// redirect case to /about from path /about-me
app.get("/about-me", (req, res) => {
    // express has this .redirect() method that allows us to redirect user with an automatic status code or manual status code to a path
    res.redirect("/about");
});

// 404 error case when the URL does not exist or is incorrect
app.use((req,res) => {

    /*
    so the way we are handling a 404 in express is using the app.use().
    app.use() runs a request handler on EVERY request, but we purposely position this one 
    at the bottom/end of the file to handle any request that doesn't match the other app.get() above. 
    Notice that app.use() does NOT specify a specific path for the request, so since it runs on every request it 
    will run of no .get() paths match. 

    We also have to explicitly send a 404 status code which we can do using express's res.status() and chain it onto the 
    response object since .status returns the response object itself, so that would look like: 

    res.status(404).sendfile(whatever); => res.status(404) //runs, then returns res again => res.sendFile(whatever) //runs
    */


    res.status(404).sendFile("./404.html", {root: __dirname});
});



/*
note: when using a res.send() or a res.sendFile(), express framework automatically infers the 
type of content it is responding with so it automatically fills in the response header for us. We can still manually 
set the response header if needed.
*/

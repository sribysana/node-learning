const http = require('http');// import  http module
const url = require('url'); // import url module

// use http module to create a server
// The server will respond with a JSON object when accessed

const server = http.createServer((req,res)=>{
    console.log(`Received request for ${req.url}`);
    const parsedUrl = url.parse(req.url, true); // parse the URL
    const {pathname} = parsedUrl;
    const trimmedPathName = pathname.replace(/^\/+|\/+$/g, ''); // trim leading and trailing slashes
    console.log('trimmedPathName:', trimmedPathName);
 // console.log('pathname:', pathname);
    res.writeHead(200, { 'Content-Type': "application/json" });
    res.end(JSON.stringify({ message: 'Hello, World!' }));
});

// The server listens on port 3000
// When the server is running, it will log a message to the console
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
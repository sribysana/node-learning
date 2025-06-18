const http = require('http');// import  http module
const { json } = require('stream/consumers');
const url = require('url'); // import url module

// use http module to create a server
// The server will respond with a JSON object when accessed

const server = http.createServer((req,res)=>{
    console.log(`Received request for ${req.url}`);
    const parsedUrl = url.parse(req.url, true); // parse the URL
    const {pathname} = parsedUrl;
    const trimmedPathName = pathname.replace(/^\/+|\/+$/g, ''); // trim leading and trailing slashes
    // Extract the HTTP method from the request
    // This will be used to determine the type of request made
    const method = req.method;
    const query =parsedUrl.query; // Extract query parameters from the URL
    
    console.log('trimmedPathName:', trimmedPathName,'method:', method,'query:', query);  
    res.writeHead(200, { 'Content-Type': "application/json" });
    res.end(JSON.stringify({ message: { trimmedPathName, method, query } })); // Respond with a JSON object
});

// The server listens on port 3000
// When the server is running, it will log a message to the console
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
const http = require('http');// import  http module
const url = require('url'); // import url module
const {StringDecoder} = require('string_decoder'); // import string_decoder module (not used in this example)
const routes = require('./routes'); // import routes from routes.js

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
    const headers = req.headers; // Extract headers from the request
    
    console.log('headers:', headers);
    console.log('trimmedPathName:', trimmedPathName,'method:', method,'query:', query);  
    const decoder = new StringDecoder('utf-8'); // Create a string decoder
    let buffer =''; // Initialize an empty buffer to store the request body
    // Listen for data events on the request object
    // This will allow us to capture the body of the request if it exists
    req.on('data',(data)=>{ 
      buffer += decoder.write(data); // Decode the incoming data and append it to the buffer)
    });

    // Listen for the end event on the request object
    // This indicates that the entire request body has been received

    req.on('end', ()=>{
      buffer += decoder.end(); // Finalize the decoding of the buffer
      console.log('Request body:', buffer); // Log the request body to the console
      console.log('trimmedPathName >>', trimmedPathName, routes[trimmedPathName]);
      const chosenHandeler = typeof(routes[trimmedPathName]) !== 'undefined'? routes[trimmedPathName]:routes.notFound
      let payloadObj = {};
      if (buffer) {
        try {
          console.log('buffer.constructor.name:', buffer.constructor.name);
          payloadObj = (buffer.constructor.name === 'Object') ? JSON.parse(buffer) : ( buffer.constructor.name === 'String')? buffer:''
        } catch (e) {
          payloadObj = {};
        }
      }
      console.log('payloadObj:', payloadObj);
      const data={
        trimmedPathName,
        method,
        query,
        headers,
        payload: payloadObj
      };
      chosenHandeler(data, (statusCode, handlerPayload)=>{
        const status = typeof(statusCode) === 'number' ? statusCode: 200;
        const payload = typeof(handlerPayload) === 'object' ? handlerPayload : {};
        const payloadString  = JSON.stringify(payload);
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(payloadString);
      });
    });
});

// Start the server and listen on port 3000
// When the server is running, it will log a message to the console
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
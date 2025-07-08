const handeler={};
handeler.sample =(data, callback)=>{
callback(200, {message: `This is a sample handler response1 ${data.payload}`});
}
handeler.notFound = (data, callback) => {
  callback(404, { message: 'Not Found' });
};

 const  routes = {
    sample: handeler.sample,
    notFound: handeler.notFound
};

module.exports = routes;

const envernment = {};
envernment.stageign ={
    port: 3000,
    name: 'staging',
}
envernment.production = {
    port: 5000,
    name: 'production',
}
console.log('process.env.NODE_ENV:', process.env);
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
module.exports = typeof(envernment[currentEnvironment]) !== 'undefined' ? envernment[currentEnvironment] : envernment.stageign
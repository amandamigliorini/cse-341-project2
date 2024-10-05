const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books and Readers Api',
        description: 'Books and REaders Api'
    },
    host: 'localhost:5000',
    schemes: ['http', 'https']
};

const outputFile = "./swagger.json";
const endpointsFiles = ['./routes/index.js'];

// code that create the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
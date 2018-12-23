let StaticServer = require('static-server');        //npm install static-server

let server = new StaticServer({
    rootPath: './public/',
    port: 3000
});

server.start(()=>{
    console.log(`Server started on port ${server.port}`);
});
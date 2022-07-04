const http = require("http");
const express=require("express");
var RED = require("node-red");

const app= express();
// app.use(express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/",
    httpNodeRoot: "/api",
    userDir:"./home/nol/.nodered/",
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2b$08$Cq1XJn9DUnrYTVHNtksiheM.0QiFXdx0ECgnQgnDj8tb2DXbELwk.",
            permissions: "*"
        }]
    },
    
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings)

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin)

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode)

const port= process.env.PORT || 8080;
server.listen(port, ()=>{
    console.log(`server started on port ${port}`)
});

// Start the runtime
RED.start()
.then(e=>{
    console.log("red started")
})
.catch(e=>{
    console.log("error starting node-red")
    console.log(e);
});

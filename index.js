const express = require("express"); 
const morgan = require("morgan"); 
const { createProxyMiddleware } = require("http-proxy-middleware"); 
require("dotenv").config(); 
  
// Create Express Server 
const app = express(); 
  
// Configuration 
const PORT = 443; 
const HOST = "0.0.0.0"; 
const { API_BASE_URL } = process.env; 
const API_SERVICE_URL = `${API_BASE_URL}`; 
  
// Logging the requests 
app.use(morgan("dev")); 
  
// Proxy Logic :  Proxy endpoints 
app.use( 
    "/", 
    createProxyMiddleware({ 
        target: API_SERVICE_URL, 
        changeOrigin: true, 
        // prependPath: true
        // pathRewrite: { 
        //     "^/weather": "", 
        // }, 
        
    }) 
); 
  
// Starting our Proxy server 
app.listen(PORT, HOST, () => { 
    console.log(`Starting Proxy at ${HOST}:${PORT}`); 
});
import EnvConf from "./loader/env.configuration"; 
const envConfiguration = new EnvConf(process.env.RUN_ENV || 'product'); 

const DefaultPort = 60026; 
const PORT: number = Number(envConfiguration.getPort()) || DefaultPort;
const HTTPS_PORT: number = Number(PORT) || DefaultPort;
const RUN_ENV: string = envConfiguration.RUN_ENV;

import * as http from "http";
import * as https from 'https';
import * as fs from 'fs';
import * as path from "path";

import app from "./app";
let currentApplicaiton = app.callback(); 
if( RUN_ENV === 'product' ||  RUN_ENV === 'stage' ||  RUN_ENV === 'ebf' ){
    const server = http.createServer(currentApplicaiton);
    server.listen(PORT);
    console.log(`http://localhost:${PORT}`);
}else{
    const privateKey = fs.readFileSync(path.join(__dirname, "../CA/ca.key"), "utf8")
    const certificate = fs.readFileSync(path.join(__dirname, "../CA/ca.crt"), "utf8")
    const https_server = https.createServer({
        key: privateKey,
        cert: certificate
    }, currentApplicaiton);
    https_server.listen(HTTPS_PORT);
    console.log(`https://localhost:${HTTPS_PORT}`)
}
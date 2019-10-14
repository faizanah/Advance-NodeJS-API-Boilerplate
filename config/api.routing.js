'use strict';
import express from 'express'
import fs from 'fs';
const versions = fs.readdirSync(`${__dirname}/../app/`).filter(dir => !dir.match(/(^\.)|index/i));
const router = express.Router();
if (process.env.NODE_ENV === 'development') {
    console.log(`[Router Loaded]:`, routers);
}
class ApiRouting {

    static ConfigureRouters(app) {
        console.log(`[Versions Loaded]:`, versions);
        for (let version of versions) {
            console.log('Version is: ' + version)
            const routes = fs.readdirSync(`${__dirname}/../app/${version}/routes`).filter(dir => !dir.match(/(^\.)|index/i));
            for (let route of routes) {
                console.log('Route is: ' + `${version}/cb/bs/`);
                let path = `${__dirname}/../app/${version}/routes/${route}`
                require(path)(app)
                // app.use(`${version}/cb/bs/`, require(path)(router));
            }
        }
    }
}
export default ApiRouting;
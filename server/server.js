import http from 'node:http';
import { app } from "./src/app.js";
const server = http.createServer(app);
export {server}
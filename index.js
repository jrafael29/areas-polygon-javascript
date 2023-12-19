import 'dotenv/config'
import { server } from "./server/server.js";

server.listen(3005).on('listening', _ => console.log("Rodando na 3005"))
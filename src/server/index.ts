import * as express from "express"
import { processCSVRequest } from "./import";
import { sqlDB } from "./db";

const app = express();
app.use(express.json())
const port = 8080; // default port to listen

app.get( "/", ( req: any, res: any) => {
    sqlDB.all('SELECT * FROM transactions', (err, rows) => {
        res.send( rows );
    })
} );

app.post("/csv", processCSVRequest)

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
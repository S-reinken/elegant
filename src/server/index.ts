import * as sqlite3 from "sqlite3"
const express = require( "express" );
const app = express();
const port = 8080; // default port to listen

let db = new sqlite3.Database("./elegant.db", (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the elegant database.');
})

// define a route handler for the default home page
app.get( "/", ( req: any, res: any) => {
    db.all('SELECT * FROM transactions', (err, rows) => {
        res.send( rows );
    })
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
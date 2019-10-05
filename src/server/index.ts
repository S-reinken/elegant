import * as sqlite3 from "sqlite3"
import * as express from "express"
const app = express();
app.use(express.json())
const port = 8080; // default port to listen

let db = new sqlite3.Database("./elegant.db", (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the elegant database.');
})

app.get( "/", ( req: any, res: any) => {
    db.all('SELECT * FROM transactions', (err, rows) => {
        res.send( rows );
    })
} );

app.post("/csv", (req, res) => {
    console.log(`WHat does my request look like? :: ${req.body}`)
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
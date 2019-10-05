import * as sqlite3 from "sqlite3"
import * as express from "express"
import { map, forEach } from "lodash/fp"
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

type AmexTransaction = {
    Date: string,
    Description: string,
    Category: string,
    Amount: string
}
const makeInserts = map((obj: AmexTransaction) => `INSERT INTO transactions values("${obj.Date}", "NONE", "${obj.Description}", "${obj.Category}", "${obj.Amount}")`)


app.post("/csv", (req, res) => {
    console.log(`What does my request look like? :: ${JSON.stringify(req.body)}`)
    console.log(makeInserts(req.body))
    forEach((q: string) => db.run(q), makeInserts(req.body))
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
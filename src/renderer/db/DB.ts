import * as sqlite3 from "sqlite3"

export const connectToDB = () => {
    let db = new sqlite3.Database("~/elegant.db", (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to the elegant database.');
    })
}
import * as sqlite3 from "sqlite3"
import { forEach, curry } from "lodash/fp";

export const sqlDB = new sqlite3.Database("./elegant.db", (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the elegant database.');
})

export class DB<T> {
    db = sqlDB
    private constructor(private value: T) {}

    static of<T>(value: T) {
        return new DB(value)
    }

    map<R>(f: (wrapped: T) => R): DB<R> {
        return DB.of(f(this.value))
    }

    bind<R>(f: (wrapped: T) => DB<R>): DB<R> {
        return f(this.value)
    }

    runQuery() {
        const res = this.value as any
        forEach((item: any) => this.db.run(`${item}`), res)
    }
}
export const mmap = curry((fn: any, monad: any) => monad.map(fn))
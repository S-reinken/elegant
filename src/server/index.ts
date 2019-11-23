import * as express from "express"
import {processCSVRequest} from "./import"
import {TaskEither} from "fp-ts/lib/TaskEither"
import {getAll} from "./db"
import {getTransactionsForAccount} from "./transactions"

const app = express()
app.use(express.json())
const port = 8080 // default port to listen

const post = <X, Y, Z>(fn: (arg: X) => TaskEither<Y, Z>) => (
  req: any,
  res: any
) => fn(req.body)().then(val => res.send(val))

const get = (fn: (arg: any) => TaskEither<any, any>, param: string) => (
  req: any,
  res: any
) =>
  fn(req.params[param])().then(val => {
    console.log(val)
    res.send(val)
  })

const settle = (task: TaskEither<any, any>) => (req: any, res: any) =>
  task().then(val => res.send(val))

app.get("/transactions/:accountId", get(getTransactionsForAccount, "accountId"))
app.get("/accounts", settle(getAll("accounts")))
app.post("/csv", post(processCSVRequest))

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

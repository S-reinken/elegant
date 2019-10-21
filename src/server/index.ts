import * as express from "express"
import {processCSVRequest} from "./import"
import {IO} from "monet"
import {getAll} from "./accounts"
import {TaskEither} from "fp-ts/lib/TaskEither"

const app = express()
app.use(express.json())
const port = 8080 // default port to listen

const request = (fn: (arg: any) => TaskEither<any, any>) => (
  req: any,
  res: any
) => fn(req.body)().then(val => res.send(val))
const settle = (task: TaskEither<any, any>) => (req: any, res: any) =>
  task().then(val => res.send(val))

app.get("/accounts", settle(getAll("accounts")))
app.post("/csv", request(processCSVRequest))

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

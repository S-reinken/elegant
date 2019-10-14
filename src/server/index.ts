import * as express from "express"
import {processCSVRequest} from "./import"
import {IO} from "monet"
import {getAll} from "./accounts"

const app = express()
app.use(express.json())
const port = 8080 // default port to listen

const request = (fn: any) => (req: any, res: any) => res.send(fn(req.body))
const settle = (ioObj: IO<Promise<any>>) => (req: any, res: any) =>
  ioObj.run().then(val => res.send(val))

app.get("/accounts", settle(getAll("accounts")))
app.post("/csv", request(processCSVRequest))

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

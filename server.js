
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import { BestOptions, createForfait } from './helper.js'
import fs from "fs"
const app = express()
const port = process.env.PORT || 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(path.dirname(''), 'public')))
app.set('views', path.join(path.dirname(''), 'public'))
app.set('view engine', 'html');
app.get('/home', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
app.get('/monforfait', (req, res) => {
  res.sendFile(path.resolve('public/forfait.html'))
})
app.post('/forfait', (req, res) => {
  const Allforfaits = JSON.parse(fs.readFileSync('forfaits.json'))
  const data = req.body
  const priorite = [data.sms, data.appels, data.data]
  const forfaits = createForfait(Allforfaits)
  const d = BestOptions(req.body,priorite,data.validite,forfaits)
  res.send(d)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

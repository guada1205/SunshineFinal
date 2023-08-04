import app from "./app.js"
import { PORT } from './config.js'

app.listen(PORT, (err) => { 
  if (err) {
    console.log(`Server Error on port ${PORT}: `)
    console.log(err)
  }
  else console.log(`Server on port ${PORT}`)
})

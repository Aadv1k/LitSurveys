import { PORT } from './const'
import server from './server'

server.listen(8080, () => {
  console.log(`listening on http://localhost:${8080}`)
})

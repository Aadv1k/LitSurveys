import { PORT } from './const'
import server from './server'

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})

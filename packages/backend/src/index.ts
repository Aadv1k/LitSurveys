import { PORT } from './const'
import server from './server'

import SessionService from "./services/SessionService";

server.listen(PORT, async () => {
  await SessionService.init();

  console.log(`listening on http://localhost:${PORT}`)
})

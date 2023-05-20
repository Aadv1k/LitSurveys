import user from './user'
import survey from './survey'
import field from './field'
import response from './response'

export default {
  ...user,
  ...survey,
  ...response,
  ...field
}

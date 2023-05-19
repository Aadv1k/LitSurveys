import * as redis from 'redis'
import { REDIS_CONFIG } from '../const'

class SessionService {
  client: redis.RedisClientType

  constructor() {
    this.client = redis.createClient({
      socket: {
        host: REDIS_CONFIG.host,
        port: REDIS_CONFIG.port
      },
      username: REDIS_CONFIG.username || '',
      password: REDIS_CONFIG.password || ''
    })
  }

  async init() {
    await this.client.connect()
  }

  async delete(key: string) {
    try {
      const resp = await this.client.del(key)
      return key
    } catch (err) {
      throw err
    }
  }

  async push(key: string, sessionInfo: any): Promise<string> {
    try {
      const resp = await this.client.set(key, JSON.stringify(sessionInfo))
      return key
    } catch (err) {
      throw err
    }
  }

  async get(key: string): Promise<any | null> {
    try {
      const resp = await this.client.get(key)
      return JSON.parse(resp as string)
    } catch (err) {
      return null
    }
  }

  async close() {
    this.client.quit()
  }
}

export default new SessionService()

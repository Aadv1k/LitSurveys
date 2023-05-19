import { createClient } from "redis";
import { REDIS_CONFIG } from "../const";

class SessionService {
    client: any;

    constructor() {
        this.client = createClient({
            socket: {
                host: REDIS_CONFIG.host,
                port: REDIS_CONFIG.port,
            },
            username: REDIS_CONFIG.username || "",
            password: REDIS_CONFIG.password || ""
        });
    }

    async init() {
        await this.client.connect();
    }

    async pushSession(key: string, sessionInfo: any): Promise<string> {
        try {
            const resp = await this.client.set(key, JSON.stringify(sessionInfo));
            return key;
        } catch (err) {
            throw err;
        }
    }

    async getSession(key: string): Promise<Array<boolean> | null> {
        try {
            const resp = await this.client.get(key);
            return JSON.parse(resp ?? "{}");
        } catch (err) {
            throw err;
        }
    }

    async close() {
        this.client.close();
    }
}


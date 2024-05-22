import { Redis as IORedis, RedisOptions as IORedisOptions } from "ioredis";
import { isNil, isNumber } from "lodash-es";

const REDIS_CONFIG = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: parseInt(`${process.env.REDIS_PORT || "6379"}`),
};

let _instance: IORedis | null = null;

class Redis {
  static create(config = REDIS_CONFIG): IORedis {
    if (!_instance) {
      try {
        const options: IORedisOptions = {
          host: config.host,
          lazyConnect: true,
          showFriendlyErrorStack: true,
          enableAutoPipelining: true,
          maxRetriesPerRequest: 0,
          retryStrategy: (times: number) => {
            if (times > 3) {
              throw new Error(
                `[Redis] Could not connect after ${times} attempts`
              );
            }

            return Math.min(times * 200, 1000);
          },
        };

        if (config.port) {
          options.port = config.port;
        }

        if (config.password) {
          options.password = config.password;
        }

        const redis = new IORedis(options);

        redis.on("error", (error: unknown) => {
          console.error("[Redis] Error connecting", error);
        });

        _instance = redis;
      } catch (e) {
        throw new Error(`[Redis] Could not create a Redis instance`);
      }
    }

    return _instance;
  }
}

interface IStorage {
  getItem: <T = unknown>(key: string) => Promise<T | null>;
  hasItem: (key: string) => Promise<boolean>;
  setItem: <T = any>(
    key: string,
    value: T,
    opts?: Partial<IStorageItemMeta>
  ) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

interface IStorageItem {
  value: any;
}

interface IStorageItemMeta {
  ttl?: /* 指定一个过期时间，单位 millisecond */ number;
}

type IStorageConfig = Partial<{
  namespace: string;
}>;

class RedisKVStorage implements IStorage {
  /**
   * @example
   * ship.unisco.com/session/{token}
   */
  private _namespace = "";
  private _redis: IORedis;

  static create(
    config: IStorageConfig = {
      namespace: "",
    }
  ): IStorage {
    return new RedisKVStorage(Redis.create(), config);
  }

  constructor(instance: IORedis, config: IStorageConfig) {
    this._namespace = config.namespace || "";
    this._redis = instance;
  }

  private buildRedisKey(k: string) {
    return `${this._namespace}${k}`;
  }

  private pack(_k: string, v: any): IStorageItem {
    return {
      value: v,
    };
  }

  async getItem<T = unknown>(key: string): Promise<T | null> {
    try {
      const json = await this._redis.get(this.buildRedisKey(key));
      if (isNil(json)) {
        return null;
      }
      const item = JSON.parse(json) as IStorageItem;
      return item.value as T;
    } catch (error) {
      console.error("[RedisCache]", error);
      return null;
    }
  }

  async hasItem(key: string): Promise<boolean> {
    // TODO exists好像会有点问题，就是要clear的时候要把key也清理了，这个exists才会返回false？
    const result = await this._redis.exists(this.buildRedisKey(key));
    return result === 1;
  }

  async setItem<T = any>(
    key: string,
    value: T,
    opts: Partial<IStorageItemMeta> = {}
  ): Promise<void> {
    const k = this.buildRedisKey(key);
    const ttl = opts.ttl;
    await this._redis.set(k, JSON.stringify(this.pack(k, value)));
    if (isNumber(ttl)) {
      await this._redis.pexpire(k, ttl);
    }
  }

  async removeItem(key: string): Promise<void> {
    await this._redis.del(this.buildRedisKey(key));
  }

  clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let keys = [] as string[];
      const stream = this._redis.scanStream({
        match: `${this._namespace}*`,
      });
      stream.on("data", (resultKeys) => {
        keys = Array.from(new Set<string>(resultKeys));
      });
      stream.on("end", () => {
        if (keys.length === 0) {
          resolve();
          return;
        }

        this._redis
          .del(keys)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }
}

const cache = RedisKVStorage.create({
  namespace: "/qfy",
});

export { RedisKVStorage, cache };
export type { IStorage };


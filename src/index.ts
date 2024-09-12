import { engines } from "./engines";
import { Engine, TranslateOptions } from "./types";
import { Cache } from './utils/index';

const cache = new Cache();

class Translator {
  private engines: Map<string, Engine>;
  constructor() {
    this.engines = new Map<string, Engine>();
  }
  use(engine: Engine) {
    if (this.engines.has(engine.name)) {
      console.log('Engine已经存在')
      return;
    }
    this.engines.set(engine.name, engine);
  }
  translate(text: string | string[], options: TranslateOptions) {
    const { engine = "google", cache_time = 60 * 1000 } = options;
    let { from = "auto", to } = options;

    if (!this.engines.has(engine)) {
      throw new Error(`Engine ${engine} not found`);
    }

    const key = `${from}:${to}:${engine}:${text}`;
    //3. If the cache is matched, the cache is used directly
    if (cache.get(key)) {
      return cache.get(key)?.value;
    }

    const engineInstance = this.engines.get(engine);
    if (!engineInstance) {
      throw new Error(`Engine ${engine} not found`);
    }

    return engineInstance.translate(text, options).then((translated) => {
      cache.set(key, translated, cache_time);
      return translated;
    });
  }
}

const translator = new Translator();

export default {
  engines,
  translator,
  Cache,
};
export { engines, translator, Cache };

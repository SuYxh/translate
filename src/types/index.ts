
export interface TranslateOptions {
  from?: string;
  to: string;
  engine?: string;

  cache_time?: number;

  domain?: string;
}

export interface BaseEngineOption {}

export type EngineTranslateOptions = Omit<TranslateOptions, "engine">;

export type Engine = {
  name: string;
  translate: (text: string | string[], opts: EngineTranslateOptions) => Promise<string[]>;
};

export interface CacheRecord {
  value: unknown;
  timeout?: number;
  expire: number;
}

export interface Languages {
  [key: string]: string;
}

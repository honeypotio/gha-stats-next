interface ObjectLiteral {
  [key: string]: any;
}

type ExtractPromiseType<T> = T extends PromiseLike<infer U> ? U : T;

interface ConfigEntry {
  org: string;
  repo: string;
  workflow: string;
  branch: string;
}

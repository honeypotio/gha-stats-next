interface ObjectLiteral {
  [key: string]: any;
}

type ExtractPromiseType<T> = T extends PromiseLike<infer U> ? U : T;

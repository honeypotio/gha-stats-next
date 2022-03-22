export const filter = (obj: ObjectLiteral, predicate: Function) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res: ObjectLiteral, key) => ((res[key] = obj[key]), res), {});

export const deepClone = (obj: ObjectLiteral) =>
  JSON.parse(JSON.stringify(obj));

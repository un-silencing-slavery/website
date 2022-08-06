// export default function groupBy<T>(arr: T[], prop: keyof T) {
//   const map = new Map(Array.from(arr, obj => [obj[prop], []]));
//   arr.forEach(obj => map.get(obj[prop]).push(obj));
//   return Array.from(map.values());
// }
// }

const groupBy = <T, K extends keyof T>(value: T[], key: K) =>
  value.reduce((acc, curr) => {
    if (acc.get(curr[key])) return acc;
    acc.set(
      curr[key],
      value.filter((elem) => elem[key] === curr[key])
    );
    return acc;
  }, new Map<T[K], T[]>());

export default groupBy;

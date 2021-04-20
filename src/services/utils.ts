// import { Stream } from "stream";
// export function streamToString(stream: Stream) {
//   const chunks: any[] = [];
//   return new Promise((resolve, reject) => {
//     stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
//     stream.on("error", (err) => reject(err));
//     stream.on("end", () =>
//       resolve(Buffer.concat(chunks).toString("utf8"))
//     );
//   });
// }

export function basename(str: string) {
  let base = new String(str).substring(str.lastIndexOf("/") + 1)
  if (base.lastIndexOf(".") != -1)
    base = base.substring(0, base.lastIndexOf("."))
  return base
}

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never

export type QueryParam = string | string[] | undefined

export function normalizeQueryParam(
  val: QueryParam
): string | undefined {
  if (Array.isArray(val) && val.length > 1) return val[0]
  // const nv: string | undefined = val?
  return val as string | undefined
}

export function normalizeQuery(
  query: Record<string, QueryParam>
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const element = query[key]
      out[key] = normalizeQueryParam(element) as any
    }
  }
  return out
}
export const getDimensionCode = (dimensionIRI: string) => {
  const m = dimensionIRI
    .replace("https://loqudata.org/", "")
    .split("/")
  return m[m.length - 1]
}

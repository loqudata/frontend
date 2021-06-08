export type Sjsonnet = {
  interpret: (
    text: string,
    extVars: any,
    tlaVars: any,
    workingDirectory: string,
    importer: (workingDirectory: string, imported: string) => string[]
  ) => string
}

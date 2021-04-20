import { newEngine } from "@comunica/actor-init-sparql/index-browser"
import axios from "axios"
import { SparqlJsonParser } from "sparqljson-parse"

const sparqlJsonParser = new SparqlJsonParser({
  prefixVariableQuestionMark: true,
})

const myEngine = newEngine()

const commonPrefixes = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX dv: <https://ontology.loqudata.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`
// export type CodeValues =

export async function selectQuery<S = any>(
  source: S | S[],
  query: string,
  prefixes = ""
) {
  try {
    const result = await myEngine.query(
      commonPrefixes + prefixes + query,
      {
        sources: Array.isArray(source) ? source : [source],
      }
    )

    if (result.type !== "bindings") {
      throw new Error("Not a bindings response")
    }
    console.log("bindings before")

    const out = await result.bindings()
    console.log("after")

    return out
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function selectQueryPost(
  endpoint: string | any,
  query: string
) {
  const out = await axios.post(
    typeof endpoint == "object" ? endpoint.value : endpoint,
    `query=${encodeURI(query)}`,
    {
      headers: {
        // "Content-Type": "application/sparql-query",
        Accept: "application/sparql-results+json",
      },
    }
  )

  const bindings = sparqlJsonParser.parseJsonResults(out.data)
  console.log(bindings)

  return bindings
}

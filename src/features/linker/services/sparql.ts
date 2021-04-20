import { selectQuery } from "src/services/sparql"

export interface CodeList {
  iri: string
  label: string
  notation: string
}

export interface CodeLists {
  cl: CodeList[]
}

export interface CodeValue {
  iri: string
  label: string
  description?: string
}

const sparqlSource = {
  type: "sparql",
  value: "http://localhost:8010/proxy/sparql",
}

export async function getCodeLists(
  offset?: number,
  providerFilter?: string
): Promise<CodeLists> {
  const out = await selectQuery(
    sparqlSource,
    `
    SELECT  *  WHERE {

      ?dimension rdfs:label ?dimensionLabel .
      ?dimension qb:codeList ?codeList .
      ?codeList skos:notation ?notation.
      ${
        providerFilter
          ? `FILTER regex(str(?codeList), "${providerFilter}")`
          : ""
      }
    }
    ORDER BY ASC(?dimensionLabel)
    LIMIT 10
    ${offset ? `OFFSET ${offset}` : ""}`
  )

  const f = out.map((bindings) => ({
    iri: bindings.get("?codeList").value,
    label: bindings.get("?dimensionLabel").value,
    notation: bindings.get("?notation").value,
  }))
  console.log(f)
  return { cl: f }
}

export async function getValues(
  codeListIRI: string
): Promise<CodeValue[]> {
  const q = `
  
  SELECT  *  WHERE {
    <${codeListIRI}> skos:hasTopConcept ?con .
    ?con skos:prefLabel ?label .
    # ?con rdfs:comment ?description .
  }
  LIMIT 10`
  console.log(q)

  const out = await selectQuery(sparqlSource, q)

  const f = out.map((bindings) => ({
    iri: bindings.get("?con").value,
    label: bindings.get("?label").value,
    // description: bindings.get("?description").value,
  }))
  console.log(f)
  return f
}

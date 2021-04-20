import { Endpoints } from "../config/endpoints"
import axios from "axios"
// import rdfParser from "rdf-parse"
// import streamify from "streamify-string"
import jsonld from "jsonld"

export async function getDatasetRDF(
  provider?: string,
  dataset?: string
): Promise<DatasetRDF> {
  if (!dataset || !provider) {
    throw new Error("Failed to load")
  }
  const url = Endpoints.LoquStatic + `${provider}/${dataset}.jsonld`
  const out = await axios.get<any>(url)

  const framed = await jsonld.frame(out.data, {
    "@context": {
      qb: "http://purl.org/linked-data/cube#",
      skos: "http://www.w3.org/2004/02/skos/core#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xsd: "http://www.w3.org/2001/XMLSchema#",
      dct: "http://purl.org/dc/terms/",
      lqo: "https://ontology.loqudata.org/",
      "@vocab": "https://ontology.loqudata.org/",
      name: "rdfs:label",
      dimensions: {
        "@id": "qb:component",
      },
      dimension: {
        "@id": "qb:dimension",
      },
      // TODO: make this a JS number?
      index: {
        "@id": "qb:order",
        "@type": "xsd:integer",
      },
      codeList: {
        "@id": "qb:codeList",
      },
      notation: {
        "@id": "skos:notation",
      },
      label: {
        "@id": "skos:prefLabel",
      },
      numSeries: {
        "@id": "lqo:nb_series",
        "@type": "xsd:integer",
      },
      codeListInstanceClass: { "@reverse": "rdfs:seeAlso" },
      // Fixed issue with single-value arrays
      entries: { "@id": "skos:hasTopConcept", "@container": "@set" },
    },
    "@type": "qb:DataStructureDefinition",
  })
  console.log(framed)
  return framed as any
}

interface RDFBase {
  "@id": string
  "@type": string[]
}

export interface DatasetRDF extends RDFBase {
  "@context": any
  dimensions: DimensionElement[]
  name: string
  code: string
  converted_at: string
  description: string
  indexed_at: string
  json_data_commit_ref: string
  numSeries: string
  nb_series: string
  provider: Provider
}

export interface DimensionClass {
  "@id": string
}

export interface CodeListInstanceClass {
  "@reverse": string
}

export interface DimensionElement extends RDFBase {
  dimension: DimensionDimension
  index: string
}

export interface DimensionDimension extends RDFBase {
  codeList: CodeListElement
  name: string
  "rdfs:range": RdfsRange
}

export interface CodeListElement extends RDFBase {
  entries?: CodeListEntry[]
}
export interface CodeListEntry {
  notation: string
  label?: string
}
export interface RdfsRange extends RDFBase {
  name: string
  "rdfs:seeAlso": DimensionClass
  "rdfs:subClassOf": DimensionClass
}

export interface Provider {
  "@id": string
  name: string
  notation: string
}

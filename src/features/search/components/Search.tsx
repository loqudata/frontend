import {
  InstantSearch,
  SearchBox,
  Hits,
} from "react-instantsearch-dom"
import { searchClient } from "../services/searchClient"
const Hit = ({ hit }: { hit: any }) => {
  return (
    <div>
      {hit.provider_code.toUpperCase()}:{hit.code.toUpperCase()} -{" "}
      {hit.name}
    </div>
  )
}

export const Search = () => (
  <div>
    <InstantSearch indexName="datasets" searchClient={searchClient}>
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  </div>
)

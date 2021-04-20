import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter(
  {
    server: {
      // Yes, I am committing a secret, and it's bad, but by the time this is public that will have changed
      apiKey: "aaeff9df", // Be sure to use the search-only-api-key
      nodes: [
        {
          host: "search.loqudata.org",
          port: "443",
          protocol: "https",
        },
      ],
    },
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    additionalSearchParameters: {
      queryBy: "name,description,dimension_values,dimension_labels",
      // group_by: "provider_code",
      // group_limit: 2,
      exclude_fields: "dimension_values",
    },
  }
)
export const searchClient = typesenseInstantsearchAdapter.searchClient

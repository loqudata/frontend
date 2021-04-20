# About

Loqu is a 100% open source tool for data exploration and visualization, and includes a large dataset of statistical data from organizations from around the world.

The source code is available under the Apache 2.0 License. Data is available under the Open Database License.

## Credits

Loqu wouldn't be possible without the following:

### Inspiration

Loqu is inspired by OpenRefine's facets browser in the design of the "Fields" view. It's also inspired by the DBNomics interface, and somewhat by the interfaces for DBPedia and Wikidata.

### Software

- Frontend
  - Interface
    - React
    - Chakra UI
    - Vega, Vega-Lite
    - Uniforms
    - Deck.gl, Maplibre-JS
  - Data
    - Tableschema.js
    - Apache Arrow
    - Comunica
- Backend
  - Services written in Golang and NodeJS
  - Virtuoso (open source version)

### Data

DBNomics, DBpedia, Wikidata, Geonames, Geoboundaries, and a basemap from CARTO.

All data used is available under open licenses.

We won't add data from non-public sources or under non-open licenses.

## What Loqu is Not

Loqu does not aim to be one of the following types of tools:

- ETL
- BI/complex visualization
- Tool for graph-wide or cross-dataset queries

If you want one of those, we recommend OpenRefine and Apache Superset.

If you'd like to run queries on the entire dataset, you'd need to export all the data, something that the DBNomics project currently doesn't have good support for.

We're investigating ...

## FAQ

### What's the name?

Loqu is a Greek root that means **to speak**, which is found in great words such as loquacious or eloquent.

I find it particularly apt for technology built on the Semantic Web, which aims to create descriptions of the structure and semantics (meaning) of data with reusable ontologies, and thus perhaps enhance the ability of people to communicate with data.

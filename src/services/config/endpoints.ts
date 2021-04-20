enum ProdEndpoints {
  GeoBoundaries = "https://www.geoboundaries.org/data/geoBoundariesSSCGS-3_0_0/",
  DBNomics = "https://api.db.nomics.world/v22/",
  LoquStatic = "https://static.loqudata.org/",
  LoquAPI = "https://api.loqudata.org/",
  WikipediaFileRedirect = "https://commons.wikimedia.org/wiki/Special:Redirect/file/",
}

// Could have separate endpoints here
// You can also use /etc/hosts and the docker-compose to keep the same API urls.
// enum DevEndpoints {}

export const Endpoints =
  process.env.NODE_ENV == "production" ? ProdEndpoints : ProdEndpoints

import axios from "axios"
import { Endpoints } from "src/services/config/endpoints"

//   Or:
//   http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Romania%20%281965%E2%80%931989%29.svg

export async function getImageURL(
  wikiFileName: string
): Promise<string> {
  const out = await axios.get(
    Endpoints.WikipediaFileRedirect + wikiFileName
  )
  const url = out.headers.location

  return url
}

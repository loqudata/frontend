/** The StatusWrapper takes a react-async-hook status object and renders a loading, and error state, and the provided child component */

import { Box } from "@chakra-ui/react"
import React from "react"
import { UseAsyncReturn } from "react-async-hook"

/** Takes status s and component C */
export function StatusWrapper<T>({
  s,
  C,
}: {
  s: UseAsyncReturn<T>
  C: React.FunctionComponent<{ data: T }>
}): React.ReactElement {
  if (s.error) {
    return <Box>Error: {s.error.toString()}</Box>
  } else if (s.result) {
    const comp = <C data={s.result}></C>
    return comp
  } else if (s.loading) {
    return <Box>Loading...</Box>
  }
  return <Box>Unknown state {JSON.stringify(s, null, 4)}</Box>
}

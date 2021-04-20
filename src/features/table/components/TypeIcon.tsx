import React from "react"
import { Box, BoxProps, Icon, Tooltip } from "@chakra-ui/react"
import { BiQuestionMark } from "react-icons/bi"
import { TableType } from "../services/tableSchema"
import { TableSchemaTypeMap } from "../services/TableSchemaTypeMap"

export default function TypeIcon({
  type = TableType.String,
  ...props
}: {
  type: TableType | undefined
  props?: BoxProps
}) {
  let t = TableSchemaTypeMap[type]
  if (!t) {
    t = {
      title: "Unknown Type",
      description: "This type is unknown",
      icons: [BiQuestionMark],
    }
  }
  return (
    <Tooltip label={t.title}>
      <Box {...props}>
        {t.icons.map((i, idx) => (
          <Icon key={idx} as={i} w={5} h={5} color="gray.400" />
        ))}
      </Box>
    </Tooltip>
  )
}

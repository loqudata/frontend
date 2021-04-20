import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useAsync } from "react-async-hook"
import { BiX } from "react-icons/bi"
import {
  getAllProviders,
  Provider,
} from "src/services/dbnomics/provider"
import Select from "react-select"

import {
  CodeLists,
  CodeValue,
  getCodeLists,
  getValues,
} from "../services/sparql"

const LinksView = ({
  providers,
  selectedProvider,
  codeLists,
  values,
  onCodeList,
  onProvider,
}: {
  providers: Provider[]
  selectedProvider: string
  codeLists: CodeLists
  values: CodeValue[]
  onCodeList: (iri: string) => void
  onProvider: (code: string) => void
}) => {
  console.log("in linnks", codeLists)

  // const [hovering, setHovering] = useState(false)

  return (
    <Flex h="full" mt={3}>
      <Box w="md" boxShadow="base" mr={4} borderRadius={2}>
        <Flex m={6} alignItems="center">
          <Heading size="sm" color="gray.900" flexGrow={1}>
            Code Lists/Concepts
          </Heading>

          <Box w={36}>
            <Select
              value={{
                value: selectedProvider,
                label: selectedProvider,
              }}
              options={providers.map((p) => ({
                value: p.code,
                label: p.code,
              }))}
              onChange={(v) => {
                if (v?.value) {
                  onProvider(v?.value)
                }
              }}
            />
          </Box>
        </Flex>
        {codeLists
          ? codeLists.cl.map((c, i) => (
              <Flex
                key={i}
                borderTop="1px"
                borderColor="gray.200"
                cursor="pointer"
                _hover={{
                  borderRadius: 4,
                  border: "none",
                  boxShadow: "md",
                  backgroundColor: "blue.50",
                }}
                onClick={() => {
                  onCodeList(c.iri)
                }}
                alignItems="center"
                // onMouseEnter={() => setHovering(true)}
                // onMouseLeave={() => setHovering(false)}
              >
                <Box flexGrow={1} py={4} px={6}>
                  <Heading size="sm">{c.label}</Heading>
                  <Text color="gray.600" mt={2}>
                    {c.iri.replace("https://loqudata.org/", "lq:")}
                  </Text>
                </Box>
                {i == 0 ? (
                  <IconButton
                    colorScheme="red"
                    aria-label="Remove item"
                    icon={<Icon as={BiX} width={6} height={6}></Icon>}
                    isRound
                    mr={2}
                  ></IconButton>
                ) : null}
              </Flex>
            ))
          : null}
      </Box>
      <Box w="md" boxShadow="base" mr={4} borderRadius={2}>
        <Heading size="sm" color="gray.900" m={6}>
          Values
        </Heading>

        {values
          ? values.map((c, i) => (
              <Box
                key={i}
                p={4}
                px={6}
                borderTop="1px"
                borderColor="gray.200"
                cursor="pointer"
                _hover={{
                  borderRadius: 4,
                  border: "none",
                  boxShadow: "md",
                  backgroundColor: "blue.50",
                }}
              >
                <Heading size="sm">{c.label}</Heading>

                {c.description ? <Text>{c.description}</Text> : null}
                <Text color="gray.600" mt={2}>
                  {c.iri.replace("https://loqudata.org/", "lq:")}
                </Text>
              </Box>
            ))
          : null}
      </Box>
    </Flex>
  )
}

export const Links = () => {
  const allProviders = useAsync(getAllProviders, [])

  const [selectedProvider, setSelectedProvider] = useState("all")

  const codeLists = useAsync(getCodeLists, [
    undefined,
    selectedProvider == "all" ? undefined : selectedProvider,
  ])
  const [values, setValues] = useState<CodeValue[]>([])

  const handleCodeList = async (iri: string) => {
    const vals = await getValues(iri)
    setValues(vals)
  }

  if (codeLists.error || allProviders.error) {
    return (
      <Box>
        Error:{" "}
        {(allProviders.error || codeLists.error || "").toString()}
      </Box>
    )
  } else if (codeLists.result && allProviders.result) {
    return (
      <LinksView
        selectedProvider={selectedProvider}
        onProvider={(p) => setSelectedProvider(p)}
        providers={allProviders.result}
        codeLists={codeLists.result}
        values={values}
        onCodeList={handleCodeList}
      ></LinksView>
    )
  }
  return <>Loading</>
}

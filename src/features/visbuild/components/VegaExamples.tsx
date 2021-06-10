import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Heading,
  SimpleGrid,
  Image,
} from "@chakra-ui/react"
import { useAsync } from "react-async-hook"
import { getSpecs, VEGA_EDITOR_URL } from "../services/vegaExamples"

export interface VegaExamplesProps {
  onSelect: (example: string) => void
}

// TODO: maybe make the size of these cards static
// could still be a bit bigger than in the vega editor UI
function VegaSpecs({ onSelect }: VegaExamplesProps) {
  const r = useAsync(getSpecs, ["vega-lite"])
  if (r.result) {
    const result = r.result
    return (
      <Box>
        {Object.keys(result).map((specGroup) => (
          <Box key={specGroup}>
            <Heading size="lg" my={6}>
              {specGroup}
            </Heading>

            {Object.keys(result[specGroup]).map((specType) => (
              <Box key={specType}>
                <Heading size="md" my={6}>
                  {specType}
                </Heading>
                <Box mb={6}>
                  <SimpleGrid
                    minChildWidth="200px"
                    spacingX={3}
                    spacingY={4}
                  >
                    {result[specGroup][specType].map((spec) => (
                      <Box
                        key={spec.title}
                        borderRadius="md"
                        boxShadow="base"
                        p={2}
                        pointer="cursor"
                        onClick={() => onSelect(spec.name)}
                      >
                        <Heading size="sm" mb={2}>
                          {spec.title}
                        </Heading>
                        <Image
                          // w="3xs"
                          maxH={40}
                          src={
                            VEGA_EDITOR_URL +
                            `/images/examples/vl/${spec.name}.vl.png`
                          }
                        ></Image>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    )
  }
  return <></>
}

export default function VegaExamples({
  onSelect,
}: VegaExamplesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const title = "Vega Examples"
  function handleSelect(example: string) {
    onClose()
    onSelect(example)
  }
  return (
    <>
      <Button onClick={onOpen}>Show {title}</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="80vw">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VegaSpecs onSelect={handleSelect}></VegaSpecs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

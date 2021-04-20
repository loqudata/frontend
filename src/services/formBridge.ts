import Ajv from "ajv"
import { JSONSchemaBridge } from "uniforms-bridge-json-schema"
import addFormats from "ajv-formats"

export type JSONSchema = Record<string, unknown>

export function createBridge(schema: JSONSchema) {
  const ajv = new Ajv({ allErrors: true, useDefaults: true })
  addFormats(ajv)
  function createValidator(schema: Record<string, unknown>) {
    const validator = ajv.compile(schema)

    return (model: Record<string, unknown>) => {
      validator(model)
      return validator.errors?.length
        ? { details: validator.errors }
        : null
    }
  }

  const schemaValidator = createValidator(schema)
  return new JSONSchemaBridge(schema, schemaValidator)
}

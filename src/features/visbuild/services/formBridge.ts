import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import addFormats from "ajv-formats";
export type JSONSchema = object;

export function createBridge(schema: JSONSchema) {
  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  addFormats(ajv);
  function createValidator(schema: object) {
    const validator = ajv.compile(schema);

    return (model: object) => {
      validator(model);
      return validator.errors?.length ? { details: validator.errors } : null;
    };
  }

  const schemaValidator = createValidator(schema);
  return new JSONSchemaBridge(schema, schemaValidator);
}

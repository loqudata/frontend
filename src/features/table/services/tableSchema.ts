// Man! They had a basic version of this here:
// I don't think it exports interfaces, but still.
// import {Field} from "tableschema"

/**
 * A Table Schema for this resource, compliant with the [Table Schema](https://specs.frictionlessdata.io/table-schema/)
 * specification.
 */
export interface TableSchema {
  /**
   * An `array` of Table Schema Field objects.
   */
  fields: TableSchemaField[]
  foreignKeys?: TableSchemaForeignKey[]
  missingValues?: string[]
  primaryKey?: string[] | string
}

/*
A field descriptor MUST be a JSON object that describes a single field. The
descriptor provides additional human-readable documentation for a field, as
well as additional information that may be used to validate the field or create
a user interface for data entry.
*/
export interface TableSchemaField {
  constraints?: Constraints
  description?: string

  format?: any
  name: string
  rdfType?: string
  title?: string

  type?: TableType
  bareNumber?: boolean
  /**
   * A string whose value is used to represent a decimal point within the number. The default
   * value is `.`.
   */
  decimalChar?: string
  /**
   * A string whose value is used to group digits within the number. The default value is
   * `null`. A common value is `,` e.g. '100,000'.
   */
  groupChar?: string
  falseValues?: string[]
  trueValues?: string[]
}

/**
 * The constraints property on Table Schema Fields can be used by consumers to list constraints for validating field values. For example, validating the data in a Tabular Data Resource
 * against its Table Schema; or as a means to validate data being collected or updated via a data entry interface.
 *
 * All constraints MUST be tested against the logical representation of data, and the physical representation of constraint values MAY be primitive types as possible in JSON, or represented
 * as strings that are castable with the type and format rules of the field.
 */
export interface Constraints {
  enum?: any[]
  maxLength?: number
  minLength?: number
  pattern?: string
  required?: boolean
  unique?: boolean
  maximum?: number | string
  minimum?: number | string
}

/**
 * type and format properties are used to give The type of the field (string, number etc)
 * Types are based on the type set of json-schema with some additions and minor modifications
 */
export enum TableType {
  Any = "any",
  Array = "array",
  Boolean = "boolean",
  Date = "date",
  Datetime = "datetime",
  Duration = "duration",
  Geojson = "geojson",
  Geopoint = "geopoint",
  Integer = "integer",
  Number = "number",
  Object = "object",
  String = "string",
  Time = "time",
  Year = "year",
  Yearmonth = "yearmonth",
}

/**
 * Table Schema Foreign Key
 */
export interface TableSchemaForeignKey {
  /**
   * Fields that make up the primary key.
   */
  fields: string[] | string
  reference: Reference
}

export interface Reference {
  fields: string[] | string
  resource: string
}

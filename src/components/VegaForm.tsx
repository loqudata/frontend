import { createBridge } from "../services/formBridge"

import {
  AutoForm,
  AutoFields,
  ErrorsField,
  SubmitField,
  ErrorField,
} from "uniforms-semantic"

import { AutoFormProps } from "uniforms"

import schema from "../../vega-schemas/vl_5_transformed.json"

import { Accordion } from "semantic-ui-react"

const ns = schema as any
ns["$ref"] = "#/definitions/Axis"

/** A group is a set of related fields to group in a form interface */
interface Group {
  /**The name is displayed in the interface */
  name: string
  /** The prefix selects the fields from the schema object. In the future, we may allow a group to be defined as just a list of field names */
  prefix: string
}

const GroupedFields = ({
  groups,
  schemaObj,
}: {
  groups: Group[]
  schemaObj: any
}) => {
  const objs = groups.map((g) => {
    const fields = Object.keys(schemaObj).filter((k) =>
      k.startsWith(g.prefix)
    )
    return {
      key: g.name,
      title: g.name,
      content: {
        content: (
          <>
            <AutoFields fields={fields} />
            {fields.map((f) => (
              <ErrorField key={f} name={f}></ErrorField>
            ))}
          </>
        ),
      },
    }
  })

  return <Accordion defaultActiveIndex={undefined} panels={objs} />
}

function VegaForm<T>(props: Partial<AutoFormProps<T>>) {
  const data = createBridge(ns)

  const axisGroups = ["title", "domain", "label", "tick", "grid"]

  const opts = Object.assign(
    { autosave: true, autosaveDelay: 1000 },
    props
  )

  return (
    <div>
      <h4>Axis Editor (Right now its really just a viewer)</h4>
      <div>
        <AutoForm {...opts} schema={data}>
          <GroupedFields
            groups={axisGroups.map((a) => ({
              name: a.toUpperCase(),
              prefix: a,
            }))}
            schemaObj={ns.definitions.Axis.properties}
          ></GroupedFields>
          {/* <AutoFields /> */}
          <ErrorsField />
          <SubmitField />
        </AutoForm>
      </div>
    </div>
  )
}

export { VegaForm }

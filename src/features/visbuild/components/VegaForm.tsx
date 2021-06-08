import { createBridge } from "../services/formBridge"

import { useAsync } from "react-async-hook"

import {
  AutoForm,
  AutoFields,
  ErrorsField,
  SubmitField,
} from "uniforms-semantic"

import { AutoFormProps } from "uniforms"

// import { capitalCase } from "change-case"

import schema from "vega-schemas/vl_5_transformed.json"
import styles from "../styles/form.module.css"

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
  const objs = groups.map((g) => ({
    key: g.name,
    title: g.name,
    content: {
      content: (
        <AutoFields
          fields={Object.keys(schemaObj).filter((k) =>
            k.startsWith(g.prefix)
          )}
        />
      ),
    },
  }))

  return <Accordion defaultActiveIndex={0} panels={objs} />
}

async function makeBridge() {
  return createBridge(ns)
}

function VegaForm<T>(props: Partial<AutoFormProps<T>>) {
  const data = useAsync(makeBridge, [])

  return (
    <>
      {data.loading && <div>Loading</div>}
      {data.error && console.log(data.error) && (
        <div>Error: {data.error.message}</div>
      )}
      {data.result &&
        (function () {
          console.log(data.result)

          const axisGroups = [
            "title",
            "domain",
            "label",
            "tick",
            "grid",
          ]

          const opts = Object.assign(
            { autosave: true, autosaveDelay: 1000 },
            props
          )

          return (
            <div className={styles.formContainer}>
              <h4>Axis Editor</h4>
              <div className={styles.formContent}>
                <AutoForm {...opts} schema={data.result}>
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
        })()}
    </>
  )
}

export { VegaForm }

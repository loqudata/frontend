## Goal

Sufficiently normalize the Vega Lite JSON schema so it can be used by Uniforms to render forms that will allow users a visual medium to draft Vega specifications.

We only want to focus on the most important parts of the Vega spec: the axes, perhaps title, width, etc.

In the end we may want to only select a subset of options to expose to the user so not to overwhelm

## Things Uniforms JSON Schema parser doesn't like

General issues with `anyOf` handling: https://github.com/vazco/uniforms/issues/863

### Array inside `anyOf`

Error: `Invariant Violation: Field not found in schema: "domainDash.0"`

```json
{
  "domainDash": {
    "anyOf": [
      {
        "description": "An array of alternating [stroke, space] lengths for dashed domain lines.",
        "items": {
          "type": "number"
        },
        "type": "array"
      },
      {
        "$ref": "#/definitions/ExprRef"
      }
    ]
  }
}
```

Replace with

```json
{
  "domainDash": {
    "description": "An array of alternating [stroke, space] lengths for dashed domain lines.",
    "items": {
      "type": "number"
    },
    "type": "array"
  }
}
```

See e.g. https://github.com/vazco/uniforms/issues/91

The reason this happens is that the `_compiledschema` doesn't know how to handle it an array when it runs into an error so it doesn't create the first element which the library needs.

### Multiple Types

Error: `Invariant Violation: Unsupported field type: boolean,number`

```json
{
  "labelFlush": {
    "description": "Indicates ...",
    "type": ["boolean", "number"]
  }
}
```

```json
{
  "labelFlush": {
    "description": "Indicates ...",
    "type": "number"
  }
}
```

See https://github.com/vazco/uniforms/issues/756

### Others

When some definitions had a `$schema` key set, another error.

Also, something about cannot be represented by null when an `anyOf` has null as the first option. That's from https://github.com/vazco/uniforms/issues/863, because Uniforms only looks at the `type` of the first option.

Best to remove `"type": null`s then, although they do have semantic importance.

Nested anyOfs e.g. tickColor

`Error: unknown format "color-hex" ignored in schema at path "#/definitions/HexColor"`
Just delete

`Uncaught Invariant Violation: Field not found in schema: "axis.values.0"`
also delete

```json
{
                "values": {
                    "anyOf": [
                        {
                            "items": {
                                "type": "number"
                            },
                            "type": "array"
                        },
                        {
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        },
                        {
                            "items": {
                                "type": "boolean"
                            },
                            "type": "array"
                        },
                        {
                            "items": {
                                "$ref": "#/definitions/DateTime"
                            },
                            "type": "array"
                        }
                    ],
                    "description": "Explicitly set the visible axis tick values."
                },
}
```


## Transforms

In `anyOf`
Remove `type: Null`, `ExprRef` and `Condition*` if present.
Jump up one if only one element in `anyOf`


Future: could fetch on load
Probably not b/c slow, uniforms rendering
Also, need to do transforms.

```ts
const VEGA_LIGHT_V5_SCHEMA_URL =
  "https://vega.github.io/schema/vega-lite/v5.json";
```
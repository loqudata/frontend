# First version

March 24, 2021

- Basic rendering of basic example graph with Vega
- Form to edit axis
- Responsive design, semantic UI based theme

Main efforts

- Getting started, bringing in Vega libraries, writing components
- Transforming the Vega JSON Schema to get over various issues from the Uniforms library
- The form is generated from that schema

Thought about:

- Grouping Axis properties by the first word in the key: e.g. `label`, `title`, or `domain`. With dropdowns this could seriously shrink/simplify UI
- Having basic Vega templates like
  - Line chart
  - Bar chart (stacked)
  - Pie chart
- where only a few options are available to user:
  - Setting axes
- Simplicity is often better than full options, if tweaks needed can export specification.
- Interactive modification: e.g. click on axis to open editor for it, legend for that and chart title. This would likely require using SVG renderer, good, and figuring out from Vega descriptions -> aria labels or roles what the elements are, then attaching listeners to those elements, then opening the appropriate form.

Goals for next time:

- shrink width of chart in wide view
- have a select or dropdown to load examples
- start testing out views for dataset, features with types, facets
- add chevron or button to collapse properties (axes) view

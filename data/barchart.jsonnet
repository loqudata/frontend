local Chart(data = {}, xField = "", yField = "") = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A simple bar chart with embedded data.",
  "data": data,
  "mark": "bar",
  "encoding": {
    "x": {"field": xField, "type": "nominal", "axis": {"labelAngle": 0}},
    "y": {"field": yField, "type": "quantitative"}
  }
};


{
  chart: Chart({
    "values": [
      {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}
    ]
  }, "a", "b")
}
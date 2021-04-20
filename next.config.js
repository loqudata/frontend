const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
})
const withPlugins = require("next-compose-plugins")

module.exports = withMDX()

module.exports = withPlugins(
  [
    [
      withMDX,
      {
        pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
      },
    ],
  ],
  {
    future: {
      webpack5: true,
    },

    typescript: {
      // ignoreDevErrors: true,
      // ignoreBuildErrors: true,
    },
    /** @type function(import('webpack').Configuration) */
    webpack(config) {
      config.resolve.alias = Object.assign(config.resolve.alias , {
        "mapbox-gl": "maplibre-gl",
        // react: require.resolve("react"),

        // "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
        // "react/jsx-runtime": require.resolve("react/jsx-runtime"),
      })
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              replaceAttrValues: {
                "#efaa2d": "currentColor",
              },
              svgoConfig: {
                plugins: [
                  { removeTitle: false },
                  { removeDimensions: true },
                ],
              },
            },
          },
        ],
      })
      config.resolve.fallback = {
        fs: false,
        http: false,
        https: false,
        stream: "stream-browserify",
      }

      return config
    },
  }
)

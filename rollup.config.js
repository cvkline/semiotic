import node from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import builtins from "rollup-plugin-node-builtins"
import replace from "rollup-plugin-replace"
import regenerator from "rollup-plugin-regenerator"

export default {
  exports: "named",
  input: "src/components/index.js",
  output: {
    format: "umd",
    file: "dist/semiotic.js",
    name: "Semiotic"
  },
  interop: false,
  globals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  external: ["react", "react-dom"],
  plugins: [
    node({ jsnext: true, preferBuiltins: false }),
    regenerator({ includeRuntime: true, sourceMap: false }),
    builtins(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/d3-sankey-circular/dist/index.js": [
          "sankeyCircular",
          "sankeyLeft",
          "sankeyCenter",
          "sankeyRight",
          "sankeyJustify"
        ]
      }
    }),
    replace({
      "process.env.NODE_ENV": '"production"'
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [["es2015", { modules: false }], "react", "stage-0"],
      plugins: ["external-helpers"]
    })
  ]
}

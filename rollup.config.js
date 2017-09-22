import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import babelrc from "babelrc-rollup"

const pgk = require("./package.json")
const babelConfig = babelrc({
  config: pgk.babel,
})

export default {
  input: "lib/index.js",
  output: {
    file: `dist/index.js`,
    format: "es",
    name: pgk.name,
    sourcemap: true,
    banner: `/* ${pgk.name} version ${pgk.version} */`,
    footer: `/* follow ${pgk.name} on Github! ${pgk.repository.url} */`,
  },
  plugins: [
    resolve(),
    babel(babelConfig),
  ],
}
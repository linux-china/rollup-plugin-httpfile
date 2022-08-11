const httpfileResolverPlugin = require("./index");

/**
 * @type {import("rollup/dist/rollup").RollupOptions}
 */
const config = {
    input: "demo/hello.mjs",
    output: {dir: 'dist', esModule: true},
    plugins: [
        httpfileResolverPlugin(true)
    ],
}

module.exports = config;

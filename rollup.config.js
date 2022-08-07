import httpfileResolverPlugin from "./index"

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

export default config;

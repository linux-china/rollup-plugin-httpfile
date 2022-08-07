Rollup httpfile plugin
=======================

An Rollup.js plugin to import [httpfile](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) for HTTP Request/GraphQL request.

# How to use?

* Create a http file, such as `demo.http`, code as following:

```
### get my ip
//@name my-ip
GET https://httpbin.org/ip
User-Agent: curl/7.47.0

### post test
//@name post-test
POST https://{{host}}/post
User-Agent: curl/7.47.0
Content-Type: application/json

{
  "name": "{{nick}}",
  "age": 42,
  "uuid": "{{$uuid}}"
}
```

* Add `rollup-plugin-httpfile` to your project's `package.json` or `npm add -D rollup-plugin-httpfile`.

```
 "devDependencies": {
    "rollup-plugin-httpfile": "^0.1.0"
  }
```

* In JavaScript/TypeScript file, such as `hello.mjs`, and you can import http file directly. Code as following:

```javascript
import {myip} from "./demo.http";

let response = await myip();
console.log(await response.json());
```

# rollup.config.js configuration

```javascript
import httpfileResolverPlugin from "rollup-plugin-httpfile"

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
```

# References

* Rollup Plugin Overview: https://rollupjs.org/guide/en/#plugins-overview
* esbuild-plugin-httpfile: esbuild plugin for httpfile https://github.com/linux-china/esbuild-plugin-httpfile

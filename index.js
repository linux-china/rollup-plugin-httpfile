import path from "node:path";
import fs from "node:fs";

import {parseHttpfile} from "./httpfile";

/**
 * build rollup httpfile plugin
 * @param {boolean=} verbose - enable verbose logging
 */
export default function httpfileResolverPlugin(verbose) {
    return {
        name: 'httpfile-resolver', // this name will show up in warnings and errors
        resolveId(source, importer) {
            if (source.endsWith('.http')) {
                return path.resolve(path.dirname(importer), source);
            }
        },
        load(httpfilePath) {
            if (httpfilePath.endsWith('.http')) {
                let httpfileText = fs.readFileSync(httpfilePath, 'utf8');
                let targets = parseHttpfile(httpfileText);
                // generate javascript stub code
                let contents = targets.map(target => {
                    return target.toCode();
                }).join("\n\n");
                if (verbose) {
                    // generate typescript declaration file
                    let declareFileName = path.basename(httpfilePath);
                    let declaredApiList = targets.map(target => {
                        return target.toApiDeclare();
                    }).join("\n    ");
                    let moduleDeclareCode = `declare module '*${declareFileName}' {\n    ${declaredApiList}\n}`;
                    // logging
                    let declaredFileName = declareFileName.replace(".http", "-http.d.ts");
                    console.log("=====================" + declaredFileName + "==========================================");
                    console.log(moduleDeclareCode);
                    console.log("=====================" + declareFileName + ".js========================================");
                    console.log(contents);
                    console.log("=======================================================================================");

                }
                return contents;
            }
        }
    };
}

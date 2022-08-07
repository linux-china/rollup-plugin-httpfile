declare module 'rollup-plugin-httpfile' {

    export default function httpfileResolverPlugin(verbose?: boolean): { name: string, resolveId: any, load: any };

}

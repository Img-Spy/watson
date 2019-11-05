const path = require('path');
const slash = require('slash');

const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');
const replace = require('rollup-plugin-replace');
const intermediateBundle = require('rollup-plugin-intermediate-bundle');
const nodeGyp = require('rollup-plugin-node-gyp');
const electron = require('rollup-plugin-electron');
const silentCircular = require('rollup-plugin-silent-circular');

const { watsonBundleModules } = require('watson-core/bundles');

const pkg = require('./package.json');

const opts = new function Options() {
    this.rootDir = __dirname;
    this.pluginsDir = process.env.WATSON_PLUGINS_PATH ||
        path.resolve(this.rootDir, 'dist');
    this.tskDir = process.env.WATSON_TSK_PATH ||
        path.resolve(this.rootDir, 'node_modules/tsk-js/');

    this.distDir = path.resolve(this.pluginsDir, "explorer");
    this.binDir = path.resolve(this.distDir, "bin");
}();

/////////

module.exports = {
    input: {
        "explorer-view": path.resolve(opts.rootDir, './private/view/index.tsx'),
        "explorer-workers": path.resolve(opts.rootDir, './private/workers/index.ts')
    },
    output: {
        dir: opts.distDir,
        sourcemap: true,
        format: 'cjs',
        banner: `(function() {`,
        footer: `})()`,
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: '[name].[hash][extname]',
    },
    external: [
        ...['path', 'crypto', 'child_process', 'fs'],
        ...['electron'],
    ],
    manualChunks: {},
    plugins: [
        intermediateBundle.use({
            path: '../../../js/watson.js',
            modules: watsonBundleModules
        }),
        copy({
            targets: [
                { src: slash(path.resolve(opts.rootDir, "package.json")), dest: opts.distDir },
                process.platform !== "win32" ? undefined :
                    { src: slash(path.resolve(opts.tskDir, 'build/Release/*.dll')), dest: opts.binDir }
            ].filter((target) => !!target),
            verbose: true
        }),
        replace({
            exclude: 'node_modules/**',
            values: {
                "process.env.NODE_ENV": "'development'"
            }
        }),
        typescript({
            typescript: require('typescript'),
            objectHashIgnoreUnknownHack: true,
            tsconfig: path.resolve(opts.rootDir, 'tsconfig.json')
        }),
        resolve(),
        commonjs({
            include: [/node_modules/],
            extensions: ['.js', '.ts', '.tsx'],
            namedExports: {
                'src/node_modules/@phosphor/widgets/lib/index.js': [
                    'DockPanel', 'Widget'
                ]
            }
        }),
        nodeGyp(),
        silentCircular({
            exclude: /node_modules\/react-redux-form/
        }),
        electron({ main: true }),
        postcss(),
    ],
};

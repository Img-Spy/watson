const path = require('path');
const slash = require('slash');

const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');
const replace = require('rollup-plugin-replace');
const intermediateBundle = require('rollup-plugin-intermediate-bundle');
const silentCircular = require('rollup-plugin-silent-circular');
const electron = require('rollup-plugin-electron');

const { watsonBundleModules } = require('watson-core/bundles');

const pkg = require('./package.json');

const opts = new function Options() {
    this.rootDir = __dirname;
    this.distDir = process.env.WATSON_UI_PATH ||
        path.resolve(this.rootDir, "dist");
    this.assets = path.resolve(this.distDir, "assets");
}();

/////////

module.exports = {
    input:  path.resolve(opts.rootDir, './src/renderer.tsx'),
    output: {
        dir: opts.assets,
        sourcemap: true,
        sourcemapPathTransform: (file) => {
            const newFile = `../../../src/processes/ui/${file.substring(9)}`
            return newFile;
        },
        format: 'cjs',
        banner: `(function() {`,
        footer: `})()`,
        entryFileNames: 'js/[name].js',
        assetFileNames: '[name].[hash][extname]',
        chunkFileNames: '[name].js',
    },
    external: [
        ...["fs", "path", "child_process", "events", "crypto", "assert", "url", 
            "constants", "stream", "net", "tty", "os", "util", "http", "https",
            "zlib", "buffer"],
        ...["electron"],

        // FIXME: Remove this externals!!
        ...["chokidar", "element-resize-detector"]
    ],
    plugins: [
        intermediateBundle.use({
            path: './js/watson.js',
            modules: watsonBundleModules
        }),
        replace({
            exclude: 'node_modules/**',
            values: {
                "process.env.NODE_ENV": "'development'"
            }
        }),
        copy({
            targets: [
                { src: slash(path.resolve(opts.rootDir, 'src/index.html')), dest: opts.assets },
                { src: slash(path.resolve(opts.rootDir, 'src/i18n/languages')), dest: opts.assets },
                { src: slash(path.resolve(opts.rootDir, 'fonts')), dest: opts.distDir },
            ],
            verbose: true
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
                'src/node_modules/react-is/index.js': [
                    'isValidElementType','isContextConsumer'
                ]
            }
        }),
        postcss(),
        electron(),
        silentCircular({
            exclude: /node_modules\/react-redux-form/
        }),
    ],
};

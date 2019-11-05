const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const silentCircular = require('rollup-plugin-silent-circular');
const electron = require('rollup-plugin-electron');
const intermediateBundle = require('rollup-plugin-intermediate-bundle');
const path = require('path');
const { watsonBundleModules } = require('watson-core/bundles');

const pkg = require('./package.json');


const opts = new function Options() {
    this.rootDir = __dirname;
    this.distDir = process.env.WATSON_MAIN_PATH ||
        path.resolve(this.rootDir, "dist");
    this.globalSrc = path.resolve(this.rootDir, "../..");
}();

/////////

module.exports = {
    input: path.resolve(opts.rootDir, './src/main.ts'),
    output: {
        dir: opts.distDir,
        sourceMap: true,
        format: 'cjs',
        assetFileNames: 'assets/[name].[hash][extname]',
        entryFileNames: '[name].js',
        chunkFileNames: 'lib/[name].js'
    },
    external: [
        ...["fs", "path", "child_process", "events", "crypto", "url", "os",
            "stream"], 
        ...["electron", "electron-store"]
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
            tsconfig: path.resolve(opts.rootDir, 'tsconfig.json')
        }),
        intermediateBundle.use({
            path: './assets/js/watson.js',
            modules: watsonBundleModules
        }),
        resolve({
            jail: opts.globalSrc
        }),
        commonjs({
            include: /node_modules/,
            extensions: ['.js', '.ts']
        }),
        silentCircular({
            exclude: /node_modules\/react-redux-form/
        }),
        electron({ main: true }),
        json()
    ],
};

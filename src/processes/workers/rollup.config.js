const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const intermediateBundle = require('rollup-plugin-intermediate-bundle');
const silentCircular = require('rollup-plugin-silent-circular');
const electron = require('rollup-plugin-electron');
const path = require('path');

const { watsonBundleModules } = require('watson-core/bundles');

const pkg = require('./package.json');

const opts = new function Options() {
    this.rootDir = __dirname;
    this.distDir = process.env.WATSON_WORKERS_PATH ||
        path.resolve(this.rootDir, "dist");
    this.globalSrc = path.resolve(this.rootDir, "../..");
}();

/////////

module.exports = {
    input: {
        'workers': path.resolve(opts.rootDir, './src/child-process.entry.ts')
    },
    output: {
        dir: opts.distDir,
        sourcemap: true,
        format: 'cjs',
        banner: `(function() {`,
        footer: `})()`,
        entryFileNames: '[name].js',
        assetFileNames: '[name].[hash][extname]',
        chunkFileNames: '[name].js',
    },
    external: [
        ...['path', 'fs', 'crypto', 'child_process'],
        ...['electron']
    ],
    plugins: [
        intermediateBundle.use({
            path: './watson.js',
            modules: watsonBundleModules
        }),
        typescript({
            typescript: require('typescript'),
            objectHashIgnoreUnknownHack: true,
            tsconfig: path.resolve(opts.rootDir, 'tsconfig.json')
        }),
        resolve({
            jail: opts.globalSrc
        }),
        commonjs({
            include: [/node_modules/],
            extensions: ['.js', '.ts', '.tsx'],            
            namedExports: {
                'src/node_modules/react/index.js': [
                    'useLayoutEffect', 'useEffect', 'useMemo', 'useContext',
                    'useReducer', 'useRef',

                    'Component', 'Children', 'PureComponent', 'PropTypes',
                    'createElement', 'Fragment', 'cloneElement', 'StrictMode',
                    'createFactory', 'createRef', 'createContext',
                    'isValidElement', 'isValidElementType',
                ],
                'src/node_modules/react-is/index.js': [
                    'isValidElementType','isContextConsumer'
                ],
                'src/node_modules/react-dom/index.js': [
                    'unstable_batchedUpdates',
                    'render', 'hydrate',
                ],
            }
        }),
        electron({
            start: true,
            main: true,
            electronArgs: ['--remote-debugging-port=9223']
        }),
        silentCircular({
            exclude: /node_modules\/react-redux-form/
        }),
    ],
};

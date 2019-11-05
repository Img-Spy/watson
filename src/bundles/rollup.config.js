const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const silentCircular = require('rollup-plugin-silent-circular');
const path = require('path');

const opts = {
    rootPath: __dirname,
    distFile: process.env.WATSON_BUNDLE_FILE || __dirname
};

module.exports = {
    input: path.resolve(opts.rootPath, 'watson-bundle.js'),
    output: [
        {
            file: opts.distFile,
            sourcemap: true,
            format: 'cjs'
        }
    ],
    external: [
        ...['fs', 'child_process', 'crypto', 'path']
    ],
    plugins: [
        resolve(),
        commonjs({
            include: /node_modules/,
            extensions: ['.js', '.ts'],
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
        silentCircular({
            exclude: /node_modules\/react-redux-form/
        }),
    ],
};

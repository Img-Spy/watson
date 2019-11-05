

module.exports = {
    watsonBundleModules: {
        // Watson modules
        "watson-core": {
            name: "watsonCore",
            namedExports: [                         
                'channels', 'buildMessageType', 'QueuedCluster',
                'reducerBuilder', 'environment', 'PluginLoader',
                'Sink', 'ReDuckModule', 'SimpleModule', 'FormModule', 
                'loadArgs', 'WorkerInfo', 'ResizeObservable', 'filter',
                'ChildProcessHelper', 'apiCodes'
            ]
        },
        "watson-api": {
            name: "watsonApi",
            namedExports: ['apiQuery', 'api', 'api$', 'finalizeMap']
        },
        "watson-material": {
            name: "watsonMaterial",
            namedExports: [
                'WindowEvent', 'Fa', 'FixedTable', 'DirectoryPicker'
            ]
        },
        "watson-navigation": {
            name: "watsonNavigation",
            namedExports: [
                'navigateModule', 'navigateSelectors', 'Route', 
                'LeftBar', 'Router', 'navigateUtils', 'Slider', 
                'Slide',  'Tabs', 'Tab'
            ]
        },
        "watson-resize": {
            name: "watsonResize",
            namedExports: [
                'resizeModule', 'ResizePanel', 'ResizeModel',
                'resizeActions',
            ]
        },

        // React modules
        "react": {
            name: "React",
            namedExports: [
                'useLayoutEffect', 'useEffect', 'useMemo', 'useContext',
                'useReducer', 'useRef', 'memo',

                'Component', 'Children', 'PureComponent', 'PropTypes',
                'createElement', 'Fragment', 'cloneElement', 'StrictMode',
                'createFactory', 'createRef', 'createContext',
                'isValidElement', 'isValidElementType',
            ]
        },

        "react-dom": {
            name: "ReactDom",
            namedExports: [
                'unstable_batchedUpdates',
                'render', 'hydrate',
            ]
        },

        "react-redux": {
            name: "ReactRedux",
            namedExports: [
                'connect', 'Provider'
            ]
        }
    }
}
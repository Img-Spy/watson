const rollup = require('rollup');
const chalk = require('chalk');
const path = require('path');

const srcPackage = require("../src/package.json");
const root = path.resolve(__dirname, "..");


// Main
(async () => {
    const distPath = path.resolve(root, 'dist');
    const jsPath = path.resolve(distPath, 'assets/js');
    const pluginsPath = path.resolve(distPath, 'assets/plugins');
    const tskPath = path.resolve(root, 'src/node_modules/tsk-js');

    Object.assign(process.env, {
        WATSON_BUNDLE_FILE: path.resolve(jsPath, "watson.js"),
        WATSON_MAIN_PATH: distPath,
        WATSON_UI_PATH: distPath,
        WATSON_WORKERS_PATH: jsPath,
        WATSON_PLUGINS_PATH: pluginsPath,
        WATSON_TSK_PATH: tskPath
    });

    watch();
})();


/////////

function prepareWatchers(rollupConfigs) {
    return rollupConfigs.map(rollupConfig => {
        if (typeof rollupConfig === 'string') {
            if (!srcPackage.dependencies[rollupConfig]) {
                console.error(`Cannot find package ${rollupConfig}`);
                process.exit(-1);
            }
            const rollupConfigPath = path.resolve(
                root, "src", srcPackage.dependencies[rollupConfig].substring(5),
                "rollup.config"
            );
            return require(rollupConfigPath);
        }
        return rollupConfig;
    });
}

function clear() {
    let lines = process.stdout.getWindowSize()[1];
    for (let i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    console.clear();
}


function printError(event) {
    console.log(chalk.red.bold(`[!] Fatal error ${event.error.code}`));
    if (event.error.loc) {
        console.log(chalk.cyan(event.error.url));
        console.log(`${event.error.loc.file}:${event.error.loc.line}:${event.error.loc.column}`);
        console.log(chalk.gray(event.error.frame));
    }
    console.log(chalk.gray(event.error.stack));
}


function bundleName({ input, output }) {
    if (typeof input === 'object') {
        input = Object.keys(input).map(key => input[key]).join(', ')
    }
    if (typeof output === 'object') {
        output = output.join(', ');
    }

    return `${input} --> ${output}`
}

function watch() {
    const watchOptions = prepareWatchers([
        // Packages
        "watson-core",
        "watson-api",
        "watson-material",
        "watson-modules",
        "watson-navigation",
        "watson-resize",

        // Bundles
        require('../src/bundles/rollup.config'),

        // Plugins
        "watson-plugin-explorer",
        "watson-plugin-search",
        "watson-plugin-timeline",

        // Processes
        "watson-main",
        "watson-ui",
        "watson-workers"
    ]);
    const watcher = rollup.watch(watchOptions);

    watcher.on('event', event => {
        switch (event.code) {
            case 'START':
                console.log(chalk.gray('Change detected'));
                break;
            case 'BUNDLE_START':
                console.log(chalk.cyan.bold(`Start build bundles from file '${bundleName(event)}'`));
                break;
            case 'BUNDLE_END':
                console.log(chalk.green.bold(`Bundles from file '${bundleName(event)}' finished in ${event.duration / 1000}s`));
                break;
            case 'END':
                console.log(chalk.gray('Finished'));
                console.log(chalk.bold('Watching files...'));
                break;

            case 'ERROR':
                console.log(`Event ${event.code}`);
                console.log(event);
                break;
            case 'FATAL':
                printError(event);
                break;

            default:
                console.log(`Event ${event.code}`);
        }
    });

    console.log(chalk.bold('Watching files...'));
}

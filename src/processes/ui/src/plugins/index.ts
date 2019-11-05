import * as path            from "path";
import { PluginLoader,
         environment }      from "watson-core";
import { WatsonState }      from "store/state";


const pluginsPath = path.join(environment.rootAppPath, "./assets/plugins");
const pluginLoader = new PluginLoader(pluginsPath);

const viewPlugins = pluginLoader.loadAll<WatsonState>().filter(p => !!p.view);

export { viewPlugins }

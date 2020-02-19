# Watson 
*Watson* is a generic cross-platform digital-forensics tool aimed to cross the 
results of different techniques from diverse digital forensic branches in order
to gather advanced evidences.

Special thanks to [ANFORA](#ANFORA).

## Plugins
*Watson* is a generic digital forensic tool so, in order let the application be
general enough, all the digital forensic functionalities are implemented through
plugins. Plugins are intended to extend specific functionalities of software,
hence, *Watson* without plugins only defines an empty window.

### Plugin Interface
The plugin interface is defined in *watson-core* module and it has three
read-only fields: info, view and workers. 

```typescript
export interface Plugin<State = any> {
    readonly info: PluginInfo;
    readonly view: PluginView<State>;
    readonly workers: PluginWorkers;
}
```

The first is called info and it contains general information of the plugin. Up 
to now, it only contains the name and is used to identify the plugin so it must 
be unique.

*View*, the second one, is an object that it is loaded by the renderer 
process to extend the user interface. It can be extended by adding 
applications, redux modules and epics. Plugins can also dispatch  redux actions 
once they are loaded using a callback function defined inside this field. All 
applications appear in the application bar (left vertical bar) and are defined 
using React.

The last one is *workers*. It contains functions that will be executed 
inside the workers process. Applications defined in *view* will call 
those procedures using *watson-api*.

Inside the package.json of the plugin, a field *watson* must be defined. 
It will contain a three fields: *name*, *view* and *workers*.

*Name* must be unique and is the plugin identifier. It is mapped inside 
the field *info.name* from the *plugin interface*.

*View* and *workers* are optional. They are unix paths that relative to the 
plugin's distribution folder. This files must export a function that receive an
object of type *PluginViewBuilder* and *PluginWorkersBuilder* respectively. They
must be used to create the fields *view* and *workers* from the 
*plugin interface* defined before.

It is very important to notice that the application has two different runtimes. 
Accordingly, two different files must be provided, and they will only be loaded 
when its respective *plugin interface* field is retrieved. 

### Plugin folder structure
The recommended folder structure for plugins is:

+ **public** Contains the files that may be used by other plugins to extend
    this plugin functionalities.
    + **modules** Redux dynamic modules associated to this plugin.
    + **state** State TypeScript interface.
    + **worker-info** Identifier to be able to call this plugin workers
        functions. 
    + **...** Other public folders

+ **private** Contains the files that can not be used by other plugins.
    + **view** Contains the plugin view elements.          
    + **workers** Contains the definition of functions to be executed in
        background. The digital forensic functions are placed here.

+ **dist** Plugin result to be added into plugins folder 
    + **js** Contains the JavaScript distribution files.
	    + **(plugin name)-view.js** View plugin bundle.
	    + **(plugin name)-workers.js** Workers plugin bundle.
	+ **...** Other folders with resources.
	+ **package.json** A copy of the package json of the plugin.

+ **rollup.config.js** Rollup configuration to create the plugin bundle.
+ **tsconfig.json** TypeScript build configurations.
+ **tslint.json** TypeScript lint configurations.
+ **package.json**


## Acknowledgements

This work has been financially supported by the MINECO/FEDER funded project 
"Análisis Forense Avanzado (ANFORA)" TEC2015-68734-R

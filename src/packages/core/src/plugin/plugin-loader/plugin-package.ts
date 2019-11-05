

type Optional<T> = T | undefined;

export interface PluginPackage {
    watson: Optional<{
        name: Optional<string>;
        view: Optional<string>;
        workers: Optional<string>;
    }>;
}

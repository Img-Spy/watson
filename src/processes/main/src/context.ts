import { WatsonWindow } from "./windows/watson-window";

export interface IContext {
    openWindows: {
        [name: string]: WatsonWindow
    };
}

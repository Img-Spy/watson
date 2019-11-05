
export type WatsonEvents = "close-settings" | "log-terminal";

export interface WindowEvents {
    [event: string]: Array<{uuid: string, cb: Function}>;
}

import { CONFIG }           from "config";


export const editMenu: Electron.MenuItemConstructorOptions = {
    label: "Edit",
    submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
    ]
};


if (CONFIG.isMacOs) {
    (editMenu.submenu as Electron.MenuItemConstructorOptions[]).push(
        { type: "separator" },
        {
            label: "Speech",
            submenu: [
                { role: "startspeaking" },
                { role: "stopspeaking" }
            ]
        }
    );
}

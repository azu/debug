import { global_debug_status } from "./DebugController";

export interface DebugOptions {
    console?: Console;
    namespaces?: string | null;
    prefixer?: () => string | undefined;
}


const noopLog = function noopLog(_message?: any, ..._optionalParams: any[]): void {
    return;
};

const createDebuggableList = (namespaces?: string) => {
    if (!namespaces || namespaces.length === 0) {
        return { allowNameList: [], denyNameList: [] };
    }
    if (namespaces === "*") {
        return { allowNameList: [/^.*$/], denyNameList: [] };
    }
    // Same logic with https://github.com/visionmedia/debug/blob/4236585a40787fe60ed625452163299600df2ce6/src/common.js#L156
    const allowNameList: RegExp[] = [];
    const denyNameList: RegExp[] = [];
    const split = namespaces.split(/[\s,]+/);
    for (let i = 0, len = split.length; i < len; i++) {
        if (!split[i]) {
            // ignore empty strings
            continue;
        }
        const namespace = split[i].replace(/\*/g, ".*?");
        if (namespace[0] === "-") {
            denyNameList.push(new RegExp("^" + namespace.substr(1) + "$"));
        } else {
            allowNameList.push(new RegExp("^" + namespace + "$"));
        }
    }
    return {
        allowNameList,
        denyNameList
    };
};

const allowOutputConsole = (message: string, allowNameList: RegExp[], denyNameList: RegExp[]): boolean => {
    for (let i = 0, len = denyNameList.length; i < len; i++) {
        if (denyNameList[i].test(message)) {
            return false;
        }
    }

    for (let i = 0, len = allowNameList.length; i < len; i++) {
        if (allowNameList[i].test(message)) {
            return true;
        }
    }
    return false;
};

export function createDebug(options: DebugOptions): (message?: any, ...optionalParams: any[]) => void {
    const console = options.console || global.console;
    if (!options.namespaces || options.namespaces.length === 0) {
        return noopLog;
    }
    const { allowNameList, denyNameList } = createDebuggableList(options.namespaces);
    if (allowNameList.length === 0) {
        return noopLog;
    }
    return function debugLog(message?: any, ...optionalParams: any[]): void {
        // Force stop to output
        if (global_debug_status === "ng") {
            return;
        }
        const prefix = options.prefixer ? options.prefixer() : undefined;
        if (!allowOutputConsole(prefix || message, allowNameList, denyNameList)) {
            return;
        }
        if (prefix) {
            console.log(prefix, message, ...optionalParams);
        } else {
            console.log(message, ...optionalParams);
        }
    };
}

import { createDebug } from "./DebugLogger";
import { DEBUG_CONTROLLER } from "./DebugController";
import { fileShortPrefixer } from "./node-prefixer";

/**
 * detect node --require
 * https://github.com/pinojs/pino-debug/blob/bd9adfd80e2106ff6270ed79974a327fe9aa89ea/index.js#L9
 */
const isRequired = module.parent && module.parent.parent === null && module.parent.filename === null;

const debug = createDebug({
    namespaces: isRequired ? "*" : process.env.DEBUG,
    console: console,
    prefixer: fileShortPrefixer
});
/**
 * debug() function output message to console
 */
export {
    debug,
    // alias to debug
    debug as debugLog,
    DEBUG_CONTROLLER
};

import { createDebug } from "./DebugLogger";
import { DEBUG_CONTROLLER } from "./DebugController";

const debug = createDebug({
    namespaces: localStorage.getItem("debug") || localStorage.getItem("DEBUG"),
    console: console
});
/**
 * debug() function output message to console
 */
export {
    debug,
    DEBUG_CONTROLLER
};

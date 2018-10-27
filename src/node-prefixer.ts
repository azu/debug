const StackTracey = require("stacktracey");
/**
 * Node.js's default prefixer implementation
 * It add file path as short name
 */
export const fileShortPrefixer = () => {
    const stack = new StackTracey();
    // [node-prefixer.ts, debug.ts, caller]
    if (stack[2]) {
        return stack[2].fileShort;
    }
    return;
};

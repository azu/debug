/**
 * global_debug_status is shared status of the debug module
 */
export let global_debug_status = true;
export const DEBUG_CONTROLLER = {
    enable() {
        global_debug_status = true;
    },
    disable() {
        global_debug_status = false;
    }
};

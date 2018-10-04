/**
 * global_debug_status is shared status of the debug module
 */
export let global_debug_status: "ok" | "force" | "ng" = "ok";
export const DEBUG_CONTROLLER = {
    enable() {
        global_debug_status = "ok";
    },
    forceEnable(){
        global_debug_status = "force";
    },
    disable() {
        global_debug_status = "ng";
    }
};

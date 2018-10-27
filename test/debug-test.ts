import { createDebug } from "../src/DebugLogger";
import * as assert from "assert";
import { DEBUG_CONTROLLER } from "../src/debug";
import { fileShortPrefixer } from "../src/node-prefixer";

const makeConsoleMock = require("consolemock");
describe("debug", function() {
    it("should output all to console when namspaces is *", () => {
        const consoleMock = makeConsoleMock();
        const debug = createDebug({
            namespaces: "*/debug-test.ts",
            console: consoleMock,
            prefixer: fileShortPrefixer
        });
        debug("a", "b", "c");
        debug(1, 2, 3);
        debug();
        const [abc, num, empty] = consoleMock.history();
        assert.deepStrictEqual(abc.LOG, ["test/debug-test.ts", "a", "b", "c"]);
        assert.deepStrictEqual(num.LOG, ["test/debug-test.ts", 1, 2, 3]);
        assert.deepStrictEqual(empty.LOG, ["test/debug-test.ts", undefined]);
    });
    it("should output all to console when namspaces is *", () => {
        const consoleMock = makeConsoleMock();
        const debug = createDebug({
            namespaces: "*",
            console: consoleMock
        });
        debug("a", "b", "c");
        debug(1, 2, 3);
        debug();
        const [abc, num, empty] = consoleMock.history();
        assert.deepStrictEqual(abc.LOG, ["a", "b", "c"]);
        assert.deepStrictEqual(num.LOG, [1, 2, 3]);
        assert.deepStrictEqual(empty.LOG, [undefined]);
    });
    it("should output matched namespace to console when namspaces: prefix", () => {
        const consoleMock = makeConsoleMock();
        const debug = createDebug({
            namespaces: "test",
            console: consoleMock
        });
        debug("test", "text");
        debug("no matched");
        debug();
        assert.strictEqual(consoleMock.history().length, 1);
        const [matched] = consoleMock.history();
        assert.deepStrictEqual(matched.LOG, ["test", "text"]);
    });
    it("should output matched namespace to console when namspaces is prefix:*", () => {
        const consoleMock = makeConsoleMock();
        const debug = createDebug({
            namespaces: "test:*",
            console: consoleMock
        });
        debug("test:", "text");
        debug("test:sub", "text");
        debug("no matched");
        debug();
        assert.strictEqual(consoleMock.history().length, 2);
        const [matched1, matched2] = consoleMock.history();
        assert.deepStrictEqual(matched1.LOG, ["test:", "text"]);
        assert.deepStrictEqual(matched2.LOG, ["test:sub", "text"]);
    });

    context("when DEBUG_CONTROLLER.disable()", () => {
        beforeEach(() => {
            DEBUG_CONTROLLER.disable();
        });
        afterEach(() => {
            DEBUG_CONTROLLER.enable();
        });
        it("should not output matched namespace to console", () => {
            const consoleMock = makeConsoleMock();
            const debug = createDebug({
                namespaces: "*",
                console: consoleMock
            });
            debug("ok", "ng");
            debug("does");
            debug("no matched");
            debug();
            assert.strictEqual(consoleMock.history().length, 0);
        });
    });
});

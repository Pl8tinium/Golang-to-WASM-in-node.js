"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

// Function to allocate memory in the WASM module
function allocateString(wasmModule, str) {
    const encoder = new TextEncoder();
    const encodedString = encoder.encode(str);
    const len = encodedString.length;
    const ptr = wasmModule.exports.malloc(len);

    const memory = new Uint8Array(wasmModule.exports.memory.buffer, ptr, len);
    memory.set(encodedString);

    return [ptr, len];
}

(async () => {
    const wasm = await WebAssembly.compile(
        fs.readFileSync("jsonImport/main.wasm")
    );
    const instance = await WebAssembly.instantiate(wasm, importObject);

    const jsonStr = JSON.stringify({ field1: "value1", field2: "value2" });
    const [ptr, len] = allocateString(instance, jsonStr);

    wasi.start(instance);

    let simpleReturn = instance.exports.parseJSON(ptr, len);

    console.log(simpleReturn);

    instance.exports.free(ptr); // Free the allocated memory
})();
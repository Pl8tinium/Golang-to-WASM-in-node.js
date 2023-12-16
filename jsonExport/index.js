"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

function getDataFromWasm(wasmModule, ptr, size) {
    const data = new Uint8Array(wasmModule.exports.memory.buffer, ptr, size - 1);
    const jsonStr = new TextDecoder().decode(data);
    return JSON.parse(jsonStr.replace(/\0/g, ""));
}

(async () => {
    const wasm = await WebAssembly.compile(
        fs.readFileSync("jsonExport/main.wasm")
    );
    const instance = await WebAssembly.instantiate(wasm, importObject);

    // Allocate memory for the JSON data
    const size = 100; // Define the size of the allocated memory
    const ptr = instance.exports.malloc(size); // Allocate memory using the WebAssembly module

    instance.exports.getJSON(ptr, size); // Call the function with the pointer and size
    const json = getDataFromWasm(instance, ptr, size); // Retrieve the JSON data
    console.log(json);

    instance.exports.free(ptr); // Free the allocated memory
})();

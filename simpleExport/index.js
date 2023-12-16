"use strict";
const fs = require("fs");
const { WASI } = require("wasi");
const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("simpleExport/main.wasm")
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

//   wasi.start(instance);
  const result = instance.exports.add(2, 3);
  console.log(result); 
})();
/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { readFileSync } from 'fs';
import * as testImports from './imports.mjs';
import { fileURLToPath } from 'url';
import pkg from 'asyncify-wasm';
const Asyncify = pkg;

process.on('unhandledRejection', err => {
  throw err;
});

import { WASI }  from "wasi";
const wasi = new WASI();

const wasmContents = readFileSync(fileURLToPath(`${import.meta.url}/../main.wasm`));
const wasmModule = new WebAssembly.Module(wasmContents);
const wasmInstance = new Asyncify.Instance(wasmModule, {
  wasi_snapshot_preview1: wasi.wasiImport,
  env: testImports 
});

console.log(wasmInstance.exports.MyAsyncFunction());
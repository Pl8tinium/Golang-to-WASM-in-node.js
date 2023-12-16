# Golang -> wasm in node.js

## Findings

TLDR: Either tinygo adds support for dependency less compilation or node.js wasi implementation would be made secure and proven to be deterministic

Currently its only possible to use tinygo compiled code with nodejs. Tinygo can compile go code to WASI, which is from my POV is *currently* (16.12.23) the only way to run go-wasm compiled code inside of nodejs. Go with wasi requires specific system functions to be provided, which the runtime needs to provide an implementation for. In this case node.js would provide them. 

Problem 1, currently those functionalities are not secure [as stated](https://github.com/nodejs/node/blob/main/doc/api/wasi.md#security) by nodejs.

Problem 2, we suspect that it might interfere with the determinism of the system as those system functions *might* behave differently throughout the different processor architectures and throughout different runtimes that are *not* nodejs. 

The preferred way would be that the go compiler would offer a solution that doesnt depend on those external system functions. This [github issue](https://github.com/tinygo-org/tinygo/issues/3068) requests this change for tinygo.

The current normal go compiler does NOT support any way to compile go to wasm for anything other than the browser environment (dependence on syscall/js functions to be provided, only available in browser). We can be sure of that by checking the available target options of the go compiler (only supports the combination `GOOS=js  GOARCH=wasm`). As a note, tinygo can also compile to browser. 

## Setup

1. npm i
1. install go
1. install tinygo
1. compile the main.go of the test you want to exec (should currently be compiled, may work, may not)
`tinygo build -target=wasi -o main.wasm main.go`
1. note: tinygo already integrates asyncify, no need to do that additional step when trying the asyncify example
1. run one of the scripts in the package.json

## Nice to know

- asyncify only works with node.js version 16 (and maybe lower)
- dont use a debugger with asyncify

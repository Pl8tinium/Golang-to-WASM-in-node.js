package main

import (
	"encoding/json"
	"unsafe"
)

/*
#include <stdlib.h>
*/
import "C"

func main() {
	// Example usage (you'll actually allocate and pass the pointer from JavaScript)
	var myData *byte = (*byte)(C.malloc(100)) // Allocating 100 bytes for simplicity
	defer C.free(unsafe.Pointer(myData))      // Ensure to free the allocated memory
	getJSON(myData, 100)                      // Passing the pointer and size
}

type MyStruct struct {
	Field1 string `json:"field1"`
	Field2 string `json:"field2"`
}

//export getJSON
func getJSON(ptr *byte, size int) {
	testObj := MyStruct{
		Field1: "value1",
		Field2: "value2",
	}
	jsonBytesArray, _ := json.Marshal(testObj)

	// Ensure that the allocated memory size is sufficient
	if len(jsonBytesArray) <= size {
		copy(unsafe.Slice(ptr, len(jsonBytesArray)), jsonBytesArray)
	}
}

package main

import (
	"encoding/json"
	"fmt"
	"unsafe"
)

// Define a struct that matches the JSON structure
type MyStruct struct {
	Field1 string `json:"field1"`
	Field2 string `json:"field2"`
}

//export parseJSON
func parseJSON(ptr *byte, size int) int {
	// Convert ptr and size to a Go slice
	slice := unsafe.Slice(ptr, size)

	// Unmarshal JSON
	var data MyStruct
	json.Unmarshal(slice, &data)

	// You can now use 'data' as a normal Go struct
	fmt.Println(data.Field1, data.Field2)

	if data.Field1 == "value1" && data.Field2 == "value2" {
		return 2
	}

	return 1
}

func main() {
	// Entry point needed for building
}

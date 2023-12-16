package main

import "fmt"

//go:extern fetchData
//export fetchData
func fetchData() int

//go:extern logme
//export logme
func logme(int)

func main() {
	fmt.Println("Hello World!")
}

//export MyAsyncFunction
func MyAsyncFunction() int {
	logme(99)
	data := fetchData()
	logme(88)
	return data
}

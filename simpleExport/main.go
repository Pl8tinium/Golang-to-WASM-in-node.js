package main

import "fmt"

func main() {
	fmt.Println("My Web Assembly")
}

//export add
func add(x, y int) int {
	return x + y
}

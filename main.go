package main

type Person struct {
	Name string
	Age  uint
}

func main() {
	var xiaoming Person
	xiaoming.Name = "小明"
	xiaoming.Age = 20

	// err := encoder.Encoder(&xiaoming)
	// if err != nil {
	// 	log.Panic("编码错误")
	// }
	// bc := block.CreateChain()
	// bc.AddBlock("新的详细")
	// block := block.Create("lao sree", []byte{})
	// for i, block := range bc.Blocks {
	// 	fmt.Printf("======当前区块高度=====:%d", i)
	// 	fmt.Printf("前区块链hash: %x\n", block.PreHash)
	// 	fmt.Printf("当前区块链hash: %x\n", block.Hash)
	// 	fmt.Printf("区块数据: %x\n", block.Data)
	// }

}

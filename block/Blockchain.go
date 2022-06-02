package block

type BlockChain struct {
	Blocks []*Block
}

//5.创建一个区块链
func CreateChain() *BlockChain {
	gen := GenBlock()
	return &BlockChain{
		Blocks: []*Block{gen},
	}
}

//定义一个创世块
func GenBlock() *Block {
	return Create("新的创世块诞生了!", []byte{})
}
func (bc *BlockChain) AddBlock(data string) {
	//获取上一个block
	lastBlock := bc.Blocks[len(bc.Blocks)-1]
	//获取上一个hash
	prevHash := lastBlock.Hash
	block := Create(data, prevHash)
	bc.Blocks = append(bc.Blocks, block)

}

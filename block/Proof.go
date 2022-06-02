package block

import "math/big"

type Proof struct {
	Block *Block
	//存储大数，有很多方法，如：比较 赋值
	target *big.Int
}

func createProof(block *Block) *Proof {
	pow := Proof{
		Block: block,
	}
	//指定难度值
	targetStr := "0000000000000000000000000000000000000000000"
	//引入辅助变量，将上面难度值转成 Big.int
	tmpInt := big.Int{}
	//将难度值big.int 转16进制值
	tmpInt.SetString(targetStr, 16)
	pow.target = &tmpInt
	return &pow
}

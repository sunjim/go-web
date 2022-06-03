package block

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"math/big"
)

type Proof struct {
	Block *Block
	//存储大数，有很多方法，如：比较 赋值
	target *big.Int
}

func NewProofOfWork(block *Block) *Proof {
	pow := Proof{
		Block: block,
	}
	//指定难度值
	targetStr := "001000000000000000000000000000000000000000000000000000000000000"
	//引入辅助变量，将上面难度值转成 Big.int
	tmpInt := big.Int{}
	//将难度值big.int 转16进制值
	tmpInt.SetString(targetStr, 16)
	pow.target = &tmpInt
	return &pow
}
func (pow *Proof) Run() ([]byte, uint64) {
	//1.拼装数据
	//2.做hash运算
	//3.与pow中的target进行比较
	var nonce uint64
	block := pow.Block
	var hash [32]byte
	for {
		//拼装
		//以上优化
		tmp := [][]byte{
			Uint64ToByte(block.Version),
			block.PreHash,
			block.MerkelRoot,
			Uint64ToByte(block.Timestamp),
			Uint64ToByte(block.Difficulty),
			Uint64ToByte(nonce),
			block.Data,
			block.Hash,
		}
		//二维数组链接后返回一维切片
		blockInfo := bytes.Join(tmp, []byte{})

		//做hash运算
		hash = sha256.Sum256(blockInfo)
		//数组转换
		tmpInt := big.Int{}
		//将hash数组转化成big int类型
		tmpInt.SetBytes(hash[:])
		//比较hash 如果当前hash 比目标值小则找到，否则继续找
		//   -1 if x <  y
		//    0 if x == y
		//   +1 if x >  y
		if tmpInt.Cmp(pow.target) == -1 {
			//找到了
			fmt.Printf("挖矿成功! hash: %x\n,noncce: %d\n", hash, nonce)
			return hash[:], nonce
		} else {
			//没找到
			nonce++
		}

	}
}

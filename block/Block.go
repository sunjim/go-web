package block

import (
	"bytes"
	"crypto/sha256"
	"encoding/binary"
	"log"
	"time"
)

type Block struct {
	//1.版本号
	Version uint64

	//2.前区块链哈希
	PreHash []byte
	//3.Merker
	MerkelRoot []byte
	//4.时间戳
	Timestamp uint64
	//5.难度数
	Difficulty uint64
	//6.随机数
	Nonce uint64
	//7.数据
	Data []byte
	//8.当前区块hash
	Hash []byte
}

//二、创建区块
func Create(data string, pre []byte) *Block {
	block := Block{
		Version:    00,
		PreHash:    pre,
		MerkelRoot: []byte{},
		Timestamp:  uint64(time.Now().Unix()),
		Difficulty: 0,
		Nonce:      0,
		Hash:       []byte{}, //TODO
		Data:       []byte(data),
	}
	block.SetHash()
	return &block
}

//生成hash
func (block *Block) SetHash() {
	//var blockInfo []byte
	//1.拼装数据
	// blockInfo = append(blockInfo, Uint64ToByte(block.Version)...)
	// blockInfo = append(blockInfo, block.PreHash...)
	// blockInfo = append(blockInfo, block.MerkelRoot...)
	// blockInfo = append(blockInfo, Uint64ToByte(block.Timestamp)...)
	// blockInfo = append(blockInfo, Uint64ToByte(block.Difficulty)...)
	// blockInfo = append(blockInfo, Uint64ToByte(block.Nonce)...)
	// blockInfo = append(blockInfo, block.Data...)
	//以上优化
	tmp := [][]byte{
		Uint64ToByte(block.Version),
		block.PreHash,
		block.MerkelRoot,
		Uint64ToByte(block.Timestamp),
		Uint64ToByte(block.Difficulty),
		Uint64ToByte(block.Nonce),
		block.Data,
		block.Hash,
	}
	//二维数组链接后返回一维切片
	blockInfo := bytes.Join(tmp, []byte{})
	//2.shar256
	hash := sha256.Sum256(blockInfo)
	block.Hash = hash[:]
}

func Uint64ToByte(num uint64) []byte {
	//二进制转换
	var buffer bytes.Buffer
	err := binary.Write(&buffer, binary.BigEndian, num)
	if err != nil {
		log.Panic(err)
	}
	return buffer.Bytes()
}

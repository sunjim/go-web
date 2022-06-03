package block

import (
	"fmt"
	"log"

	"github.com/boltdb/bolt"
)

//使用数据代替数组
type BlockChain struct {
	// Blocks []*Block
	//存入数据库
	db *bolt.DB
	//保存最后一个区块
	tail []byte
}

const blockChainDb = "blockChainDb.db"
const blockBucket = "blockBucket"
const lastHashKey = "lastHashKey"

//5.创建一个区块链
func CreateChain() *BlockChain {

	//初始化数据库
	db, err := bolt.Open(blockChainDb, 0600, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var lastHash []byte
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte(blockBucket))

		if bucket == nil {
			bucket, err = tx.CreateBucket([]byte(blockBucket))
			if err != nil {
				fmt.Errorf("create bucket: %s", err)
			}

			gen := GenBlock()
			//写入数据
			bucket.Put([]byte(gen.Hash), gen.Serialize())
			bucket.Put([]byte(lastHashKey), gen.Hash)
			lastHash = gen.Hash
		} else {
			lastHash = bucket.Get([]byte(lastHashKey))
		}

		return nil
	})
	return &BlockChain{db, lastHash}
	// return &BlockChain{
	// 	Blocks: []*Block{gen},
	// }
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

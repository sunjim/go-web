package include

import (
	"fmt"
	"io/ioutil"
	"time"

	"gopkg.in/yaml.v3"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Config struct {
	Service Mysql `yaml:"mysql"`
}
type Mysql struct {
	Path         string `yaml:"path"`           // 服务器地址
	Port         string `yaml:"port"`           // 端口
	Config       string `yaml:"config"`         // 高级配置
	Dbname       string `yaml:"db-name"`        // 数据库名
	Username     string `yaml:"username"`       // 数据库用户名
	Password     string `yaml:"password"`       // 数据库密码
	MaxIdleConns int    `yaml:"max-idle-conns"` // 空闲中的最大连接数
	MaxOpenConns int    `yaml:"max-open-conns"` // 打开到数据库的最大连接数
	LogMode      string `yaml:"log-mode"`       // 是否开启Gorm全局日志
	LogZap       bool   `yaml:"log-zap"`
}

//定义全局Gorm模型
var DB *gorm.DB

func init() {
	dsn := Dsn()
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	//获取通用数据库对象 sql.DB ，然后使用其提供的功能
	sqlDB, err := db.DB()
	if err != nil {
		panic("获取对象无效")
	}
	// SetMaxIdleConns 用于设置连接池中空闲连接的最大数量。
	sqlDB.SetMaxIdleConns(10)

	// SetMaxOpenConns 设置打开数据库连接的最大数量。
	sqlDB.SetMaxOpenConns(100)

	// SetConnMaxLifetime 设置了连接可复用的最大时间。
	sqlDB.SetConnMaxLifetime(time.Second * 30)
	DB = db
}
func GetDB(db interface{}) *gorm.DB {

	return DB
}
func (c *Config) data() *Config {
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		fmt.Printf("failed to read yaml file : %v\n", err)
	}
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		fmt.Printf("failed to unmarshal : %v\n", err)
	}
	return c
}
func Dsn() string {
	var config Config
	config.data()
	var m = config.Service
	return m.Username + ":" + m.Password + "@tcp(" + m.Path + ":" + m.Port + ")/" + m.Dbname + "?" + m.Config
}

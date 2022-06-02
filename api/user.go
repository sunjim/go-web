package api

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type Data struct {
	Name string `json:"name"`
	Id   int    `json:"id"`
}
type Format struct {
	List     []Data `json:"list"`
	Current  int    `json:"current"`
	PageSize int    `json:"pageSize"`
	Total    int    `json:"total"`
}
type Ret struct {
	Code         int    `json:"code"`
	Param        string `json:"param"`
	Msg          string `json:"msg"`
	Data         Format `json:"data"`
	Success      bool   `json:"success"`
	ErrorCode    string `json:"errorCode"`
	ErrorMessage string `json:"errorMessage"`
	ShowType     int    `json:"showType"`
	TraceId      string `json:"traceId"`
	Host         string `json:"host"`
}
type account struct {
	CurrentAuthority string `json:"currentAuthority"`
	Status           string `json:"ok"`
	Type             string `json:"type"`
}

func index(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()       //解析参数，默认是不会解析的
	fmt.Println(r.Form) //这些信息是输出到服务器端的打印信息
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	fmt.Fprintf(w, "Hello astaxie!") //这个写入到w的是输出到客户端的
}
func Product(w http.ResponseWriter, req *http.Request) {
	data1 := Data{Name: "张三", Id: 1}
	data2 := Data{Name: "李四", Id: 2}

	format := new(Format)
	//可以进行循环处理
	format.List = append(format.List, data1)
	format.List = append(format.List, data2)
	// id:=req.FormValue("id")
	ret := new(Ret)
	ret.Code = 200
	ret.Data = *format
	ret.Param = strconv.Itoa(1)

	ret_json, _ := json.Marshal(ret)
	io.WriteString(w, string(ret_json))

}
func CurrentUser(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	ret_json, _ := json.Marshal(r.Form)
	io.WriteString(w, string(ret_json))
}
func Account(w http.ResponseWriter, req *http.Request) {
	//前端传递的username

	fmt.Println(req.FormValue("username"))
	fmt.Println(req.FormValue("password"))

	ret := new(account)
	ret.CurrentAuthority = "admin"
	ret.Status = "ok"
	ret.Type = "account"
	ret_json, _ := json.Marshal(ret)
	io.WriteString(w, string(ret_json))
}
func Https() {
	//login
	http.HandleFunc("/login/account", Account)
	http.HandleFunc("/currentUser", CurrentUser)

	http.HandleFunc("/index", index)
	http.HandleFunc("/api/products", Product)
	fmt.Println("Hello world")
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("ListenAndserve: ", err)
	}
}

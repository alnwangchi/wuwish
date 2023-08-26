# 神龍變裝

## 名詞定義

### Route Groups

前台 : client
後台 : cms

### API field

劇名 : title (特別註記這個比較不太直覺得翻譯)

## 開發操作

### local API integration

連上 vm 下指令

```
sudo docker logs image-server_image_container_1
```

## 問題排除

### aws 執行個體可達性檢查失敗

1. 進 aws EC2 頁找到執行中的個體
2. 點擊右上角操作選項 "重新啟動執行個體"
3. local remote 到 vm 上
4. 進入 image-server 資料夾
5. 下指令 `sh run_service.sh` (在專案中的 memo 中有紀錄)
6. done

這問題應該是某時段 cpu 利用率爆表造成，之後可能要啟用更高等級的個體類型 (目前倒數第二便宜的)

## 其他

## 指令

build:

```
sudo docker build -t wuwish-fe .
```

看 container 哪些正在運行:

```
sudo docker ps
```

停掉 container 找到的對應 ID(動態的):

```
sudo docker stop $Id
```

啟動:

```
sudo docker run -p 3000:3000 wuwish-fe
```

## 檢討

- 應該特別定義一下所有資料的欄位名稱(大小寫、空白處理)
- 雖然專案小但還是寫個規格書還是比較好

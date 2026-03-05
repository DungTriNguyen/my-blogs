# Một số lệnh từ cơ bản đến nâng cao khi làm việc với terminal

## 1. Điều hướng thư mục

### xem thư mục hiện tại

`pwd`

### Liệt kê file/thư mục

```
ls : Hiển thị danh sách chung
ls -l: Xem quyền
ls -a : Hiển cả các file ẩn
ls -lh: Hiển thị dung lượng dễ đọc
```

### Di chuyển vào thư mục

`cd  ten_thu_muc`

### Quay lại thư mục trước đó

`cd ..`

### Quay về thư mục home

`cd ~`

### Hiển thị cấu trúc thư mục dạng cây

`tree`

## 2. Quản lý file và thư mục

### Tạo file

`touch ten_file`

### Ghi nội dung file

`echo "hello" > file`

### Tạo thư mục

`mkdir ten_folder`

### Xoá file

`rm ten_file`

### Xoá thư mục

`rm -r ten_folder`

### Copy file

`cp file_1 file_2`

### Copy thư mục

`cp -r folder_1 folder_2`

### Di chuyển hoặc đổi tên file

`mv file_1 file_2`

### Xem toàn bộ nội dung file

`cat file`

### Xem từng phần file

```
less file: Xem từng trang
head file: Xem 10 dòng đầu file
tail file: Xem 10 dòng cuối file
```

### Tìm kiếm file

```
find . -name "tên_file"
grep "keyword" tên_file
grep -r "keyword" : Tìm keyword toàn bộ project
```

### Thay đổi quyền

```
chmod 755 file.sh
```

### Kiểm tra dung lượng

```
df -h
du -sh *
```

### Kiểm tra RAM

`free -h`

### Kiểm tra OS

`uname -a`

### Lệnh liên quan tới process

```
ps aux: Xem process đang chạy
ps aux | grep node
history | grep docker
top: Xem process realtime
kill PID: kill process
kill -9 PID : force kill
npx npkill: Kiểm tra node_module của các source để xoá
```

### Lệnh network

```
ping google.com
lsof -i :3000  : Kiểm tra port
curl https://link : Download file, gửi yêu cầu server
ipconfig : Kiểm tra ip máy win
ifconfig / ip a : Kiểmt tra ip máy mac
```

### Một số phím tắt khác

```
Ctrl + C	Dừng lệnh
Ctrl + Z	Pause process
Ctrl + A	Về đầu dòng
Ctrl + E	Về cuối dòng
Ctrl + L	Clear màn hình
Ctrl + R    search history
Ctrl + D    logout terminal
Tab	        Auto complete
↑	        Lệnh trước đó
```

### Một số lệnh hữu ích khác

```
history : Kiểm tra lịch sử chạy lệnh
sudo command : Chạy với quyền admin
!!  : Chạy lệnh trước đó
clear : clear màn hình terminal
history -c : Xóa history thật
```

### Làm việc với api

```
curl -I link : Chỉ xem header của request gửi đi
curl -L link : Xem được flow direction
curl -H "" link : Thêm vào header khi gửi request
curl -v link : Xem cả request và response
curl -r 0-3000 link : thêm range cho phần request (partial content)
curl -X POST link : chỉ định HTTP method cho request (cho bt loại request nào gửi tới server)
```

### Tạo QR code từ url

```
ví dụ: https://minhshop.vn/danh-muc-san-pham/tim-kiem-0?k=babolat&s=Price_DESC&i=0&pn=1&ps=20

Cách 1:
>> curl "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://minhshop.vn/danh-muc-san-pham/tim-kiem-0?k=babolat&s=Price_DESC&i=0&pn=1&ps=20" -o qr.png
>> open qr.png

Cách 2: brew install qrencode
>> qrencode -o qr.png "https://minhshop.vn/danh-muc-san-pham/tim-kiem-0?k=babolat&s=Price_DESC&i=0&pn=1&ps=20"
```

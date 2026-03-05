# Một số lệnh từ cơ bản đến nâng cao khi làm việc với terminal
## 1. Điều hướng thư mục
### xem thư mục hiện tại
``` pwd ```
### Liệt kê file/thư mục
```
ls : Hiển thị danh sách chung
ls -l: xem quyền 
ls -a : chỉ hiển cả các file ẩn
ls -lh: hiển thị dung lượng dễ đọc 
```
### Di chuyển vào thư mục
``` cd  ten_thu_muc ```

### Quay lại thư mục trước đó
``` cd .. ```

### Quay về thư mục home
``` cd ~ ```

## 2. Quản lý file và thư mục
### Tạo file
``` touch ten_file ```
### Tạo thư mục 
``` mkdir ten_folder ```
### Xoá file
``` rm ten_file ```
### Xoá thư mục 
``` rm -r ten_folder ```
### Copy file
``` cp file_1 file_2 ```
### Copy thư mục 
``` cp -r folder_1 folder_2 ```
### Di chuyển hoặc đổi tên file 
``` mv file_1 file_2 ```
### Xem toàn bộ nội dung file
``` cat file ```
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
```
### Thay đổi quyền
```
chmod 755 file.sh
```
### Lệnh liên quan tới process 
```
ps aux: Xem process đang chạy
top: Xem process realtime
kill PID: kill process
npx npkill: Kiểm tra node_module của các source để xoá
```
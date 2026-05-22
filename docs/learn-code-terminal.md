---
title: Cẩm Nang Lệnh Terminal Từ Cơ Bản Đến Nâng Cao
description: Tổng hợp đầy đủ các lệnh Unix/Linux Shell, điều hướng thư mục, quản lý tiến trình, mạng, phím tắt và làm việc với cURL API dành cho lập trình viên.
outline: deep
---

# 💻 Cẩm Nang Lệnh Terminal Từ Cơ Bản Đến Nâng Cao

> [!TIP]
> **Làm chủ dòng lệnh (CLI):** Sử dụng thành thạo Terminal không chỉ giúp bạn tăng tốc độ làm việc lên gấp nhiều lần mà còn là kỹ năng bắt buộc đối với một kỹ sư phần mềm chuyên nghiệp khi làm việc với Docker, Server, CI/CD hoặc các công cụ tự động hóa.

---

## 📂 1. Điều Hướng Thư Mục (Directory Navigation)

| Lệnh | Ý nghĩa chức năng |
| :--- | :--- |
| `pwd` | Hiển thị đường dẫn tuyệt đối của thư mục hiện tại (Print Working Directory). |
| `cd [path]` | Di chuyển vào thư mục chỉ định. |
| `cd ..` | Quay lại thư mục cha (cấp cao hơn 1 bậc). |
| `cd ~` | Quay nhanh về thư mục gốc của người dùng (Home directory). |
| `cd -` | Quay lại thư mục làm việc vừa đứng ngay trước đó. |
| `tree` | Hiển thị cấu trúc sơ đồ hình cây của toàn bộ thư mục và tệp tin con. |

### 🔍 Liệt kê tệp tin và thư mục (`ls`):
* `ls` : Hiển thị danh sách tệp tin cơ bản.
* `ls -l` : Xem chi tiết thông số tệp tin (quyền sở hữu, kích thước, ngày sửa đổi).
* `ls -a` : Hiển thị tất cả các tệp tin bao gồm cả tệp ẩn (bắt đầu bằng dấu chấm `.`).
* `ls -lh` : Hiển thị dung lượng tệp tin dưới dạng dễ đọc (ví dụ: KB, MB, GB).

---

## 🛠️ 2. Quản Lý File & Thư Mục (File System Management)

```bash
# Tạo một tệp tin rỗng mới
touch test.txt

# Ghi hoặc chèn nội dung vào tệp tin
echo "Hello World" > test.txt      # Ghi đè nội dung mới hoàn toàn
echo "Line 2" >> test.txt          # Ghi nối tiếp vào dòng tiếp theo

# Tạo một thư mục mới
mkdir my_project

# Xóa tệp tin
rm test.txt

# Xóa thư mục con và toàn bộ dữ liệu bên trong (đệ quy - recursive)
rm -r my_project

# Sao chép tệp tin
cp file_source.txt file_dest.txt

# Sao chép toàn bộ thư mục
cp -r folder_source folder_dest

# Di chuyển hoặc đổi tên tệp tin/thư mục
mv old_name.txt new_name.txt
```

### 👁️ Đọc và tìm kiếm nội dung file:
* `cat file.txt` : Đọc toàn bộ nội dung tệp tin ra màn hình.
* `less file.txt` : Đọc tệp tin dạng phân trang (dùng phím mũi tên lên/xuống để cuộn).
* `head -n 10 file.txt` : Xem nhanh 10 dòng đầu tiên của tệp.
* `tail -n 10 file.txt` : Xem nhanh 10 dòng cuối cùng (thường dùng để đọc file Log).
* `find . -name "*.js"` : Tìm kiếm tất cả tệp tin có đuôi mở rộng là `.js` từ thư mục hiện tại.
* `grep "error" app.log` : Tìm kiếm từ khóa `"error"` nằm trong tệp tin `app.log`.
* `grep -r "TODO" .` : Tìm kiếm đệ quy từ khóa `"TODO"` trong toàn bộ dự án hiện tại.

---

## ⚙️ 3. Quản Lý Quyền & Tài Nguyên Hệ Thống

```bash
# Thay đổi quyền truy cập của tệp tin (cho phép thực thi)
chmod 755 script.sh

# Kiểm tra dung lượng ổ đĩa của hệ thống
df -h

# Kiểm tra dung lượng của các tệp tin/thư mục cục bộ
du -sh *

# Xem dung lượng RAM còn trống của máy (Linux)
free -h

# Xem thông tin nhân hệ điều hành đang sử dụng
uname -a
```

### ⚡ Làm việc với Tiến trình (Process Control):
* `ps aux` : Liệt kê tất cả các tiến trình đang chạy trên hệ thống.
* `ps aux | grep node` : Tìm kiếm nhanh ID của tiến trình Node.js đang hoạt động.
* `history | grep docker` : Tìm lại lịch sử câu lệnh liên quan đến docker đã từng chạy.
* `top` hoặc `htop` : Giao diện thời gian thực giám sát CPU, RAM và tiến trình.
* `kill [PID]` : Yêu cầu đóng tiến trình có ID chỉ định một cách an sau.
* `kill -9 [PID]` : Cưỡng chế tắt ngay lập tức tiến trình (Force Kill).
* `npx npkill` : Công cụ dọn dẹp cực nhanh các thư mục `node_modules` chiếm dung lượng lớn trong ổ đĩa của bạn.

---

## 🌐 4. Quản Lý Mạng & Giao Tiếp API

```bash
# Kiểm tra độ trễ mạng tới máy chủ
ping google.com

# Kiểm tra xem Port 3000 có đang bị ứng dụng nào chiếm dụng hay không
lsof -i :3000

# Lệnh kiểm tra cấu hình IP máy tính
ipconfig      # Đối với hệ điều hành Windows
ifconfig      # Đối với macOS hoặc Linux (hoặc dùng 'ip a')
```

### 📡 Giao tiếp mạng nâng cao với `cURL`:
* `curl -I https://api.site.com` : Chỉ lấy phần Header phản hồi từ máy chủ (tiết kiệm băng thông).
* `curl -L https://short.link` : Tự động chuyển hướng theo liên kết redirection.
* `curl -H "Authorization: Bearer KEY" https://api.site.com` : Gửi kèm thông tin Header xác thực.
* `curl -v https://api.site.com` : Bật chế độ verbose hiển thị chi tiết luồng gửi nhận request.
* `curl -X POST -d '{"name":"Dũng"}' -H "Content-Type: application/json" https://api.com/users` : Gửi yêu cầu HTTP POST kèm dữ liệu Body dạng JSON.

---

## ⌨️ 5. Phím Tắt Terminal Quyền Lực (Hotkeys Cheatsheet)

Sử dụng phím tắt giúp bạn thao tác nhanh như chớp trên màn hình console mà không cần dùng chuột:

| Phím tắt | Chức năng hành động |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>C</kbd> | Hủy/Dừng ngay lập tức lệnh đang thực thi. |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> | Tạm dừng (Pause) tiến trình hiện tại và đưa vào hàng đợi nền. |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> | Di chuyển con trỏ nhanh về **đầu dòng** lệnh đang viết. |
| <kbd>Ctrl</kbd> + <kbd>E</kbd> | Di chuyển con trỏ nhanh về **cuối dòng** lệnh đang viết. |
| <kbd>Ctrl</kbd> + <kbd>L</kbd> | Xóa sạch màn hình Terminal hiển thị (tương đương lệnh `clear`). |
| <kbd>Ctrl</kbd> + <kbd>R</kbd> | Tìm kiếm lại các câu lệnh trong lịch sử sử dụng (Reverse Search). |
| <kbd>Ctrl</kbd> + <kbd>W</kbd> | Xóa nhanh 1 từ đứng trước con trỏ hiện tại. |
| <kbd>Tab</kbd> | Tự động điền nốt tên file/thư mục (Auto-complete). |
| Phím mũi tên <kbd>↑</kbd> / <kbd>↓</kbd> | Xem lại các câu lệnh đã chạy trước đó. |

---

## 🎨 6. Thủ Thuật Thú Vị: Tạo Mã QR Ngay Trên Terminal

Bạn hoàn toàn có thể tạo nhanh một tệp ảnh QR chứa liên kết hoặc văn bản từ Terminal bằng một trong hai cách đơn giản sau:

### Cách 1: Sử dụng cURL gọi API bên ngoài
```bash
curl "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://github.com/DungTriNguyen" -o my_qr.png
```

### Cách 2: Sử dụng gói công cụ `qrencode` cục bộ
```bash
# Cài đặt qua Homebrew (macOS)
brew install qrencode

# Tạo file QR cực nhanh
qrencode -o my_qr.png "https://github.com/DungTriNguyen"
```

---

> **Hãy lưu lại cẩm nang này và chúc bạn trở thành một chuyên gia Terminal thực thụ! 🚀**

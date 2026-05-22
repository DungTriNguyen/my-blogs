---
title: Nghệ Thuật Viết Code Sạch (Clean Code Guidelines)
description: Cẩm nang thực chiến về viết code sạch (Clean Code), quy tắc đặt tên, Guard Clauses, Pure Functions và Defensive Programming dành cho lập trình viên chuyên nghiệp.
outline: deep
---

# ✍️ Nghệ Thuật Viết Code Sạch (Clean Code Guidelines)

> [!TIP]
> **Code là một tác phẩm nghệ thuật:** Viết code giống như viết một cuốn sách. Bạn không viết cho chính bạn đọc, mà là viết cho **độc giả** — những đồng nghiệp sẽ trực tiếp làm việc, bảo trì và phát triển tiếp mã nguồn của bạn. Một đoạn code đẹp và sạch sẽ giúp cuộc sống của đồng nghiệp dễ dàng hơn, và họ sẽ thầm cảm ơn bạn vì điều đó.

Trong vòng đời của một lập trình viên chuyên nghiệp:
* **80% thời gian** dành cho việc **ĐỌC** và hiểu code cũ.
* Chỉ **20% thời gian** thực tế dành cho việc **VIẾT** code mới.

Do đó, mọi tiêu chuẩn viết code sạch luôn hướng tới hai tôn chỉ cốt lõi:
1. **Dễ đọc & Dễ hiểu** $\rightarrow$ Dễ dàng bảo trì (Easy to maintain).
2. **Giải pháp tinh gọn & Ngăn nắp** (Clean and neat solution).

---

## 📌 I. Quy Tắc Đặt Tên (Naming Conventions)

### 1. Đặt tên Biến (Naming Variables)
* 🇺🇸 **Ngôn ngữ**: Tên biến bắt buộc phải bằng **tiếng Anh**.
* 🏷️ **Từ loại**: Tên biến bắt buộc phải là một **Danh từ** (Noun) hoặc cụm danh từ.
  * *Nên dùng*: `tokenMetadata`, `token`, `result`, `response`.
  * *Tránh dùng*: `getToken` (đây là một hành động, không phải danh từ).
* ❓ **Biến Boolean**: Luôn luôn bắt đầu bằng tiền tố `is`, `has`, `should`, hoặc `can`.
  * *Ví dụ*: `isHide`, `isEnabled`, `hasPaymentMethod`, `shouldRedirect`.
* 💡 **Ý nghĩa tự thân**: Tên biến phải tự giải thích rõ ràng mục đích của nó. Trong quá trình tái cấu trúc code (refactoring), hãy đồng thời cập nhật lại tên các biến liên quan nếu mục đích sử dụng đã thay đổi.

### 2. Đặt tên Hàm (Naming Functions)
* 🇺🇸 **Ngôn ngữ**: Tên hàm bắt buộc phải bằng **tiếng Anh**.
* ⚡ **Từ loại**: Tên hàm bắt buộc phải bắt đầu bằng một **Động từ** (Action/Verb).
  * *Ví dụ*: `getToken`, `setToken`, `zipFile`, `approveOrder`, `calculateTotal`.
* 💡 **Ý nghĩa tự thân**: Tên hàm phải thể hiện chính xác nhiệm vụ thực thi của hàm đó. Đừng ngần ngại đặt tên dài nếu nó giúp diễn tả đầy đủ hành động của hàm.

---

## 🛠️ II. Đơn Giản Hóa Hàm (Simplify Functions)

### 1. Nguyên tắc Đơn Nhiệm (Single Responsibility)
* Một hàm sinh ra chỉ nên giải quyết **duy nhất 1 nhiệm vụ** và làm cực tốt nhiệm vụ đó.
* ❌ **Tránh tuyệt đối các "God Functions"**: Các hàm ôm đồm quá nhiều logic phức tạp từ lấy dữ liệu, xử lý nghiệp vụ, kiểm tra quyền đến lưu trữ DB.
* 📏 **Độ dài tối đa**: Một hàm dài tối đa không nên vượt quá **100 dòng code**. Nếu vượt quá con số này, đó là dấu hiệu bắt buộc phải bẻ nhỏ hàm thành các module con.

### 2. Triệt tiêu Điều kiện lồng nhau (Nested Conditions)
Các khối điều kiện lồng nhau liên tục (lỗi "Mũi tên thần chết - Arrow Anti-pattern") làm code trở nên cực kỳ rối rắm và khó kiểm thử. Hãy sử dụng kỹ thuật **Early Return (Guard Clauses)** để loại bỏ các nhánh điều kiện lỗi sớm và giữ mạch code chính luôn thẳng tắp.

#### ❌ Code chưa tối ưu (Nested Conditions):
```typescript
function processOrder(user: { isLoggedIn: boolean, hasPaymentMethod: boolean, isPremium: boolean }) {
  if (user) {
    if (user.isLoggedIn) {
      if (user.hasPaymentMethod) {
        if (user.isPremium) {
          console.log("Processing premium order...");
        } else {
          console.log("Processing standard order...");
        }
      } else {
        console.log("No payment method found.");
      }
    } else {
      console.log("User is not logged in.");
    }
  } else {
    console.log("No user found.");
  }
}
```

#### ✅ Code đã tối ưu với Early Return (Guard Clauses):
```typescript
function processOrder(user?: { isLoggedIn: boolean, hasPaymentMethod: boolean, isPremium: boolean }) {
  // 1. Kiểm tra các điều kiện tiên quyết (Guards) và ngắt sớm
  if (!user) {
    console.log("No user found.");
    return;
  }
  if (!user.isLoggedIn) {
    console.log("User is not logged in.");
    return;
  }
  if (!user.hasPaymentMethod) {
    console.log("No payment method found.");
    return;
  }

  // 2. Luồng thực thi chính (Happy Path) nằm phẳng ở cuối hàm
  if (user.isPremium) {
    console.log("Processing premium order...");
  } else {
    console.log("Processing standard order...");
  }
}
```

---

## 🧼 III. Hàm Thuần Khiết (Pure Functions)

Hãy cố gắng tối đa thiết kế các hàm xử lý dữ liệu dưới dạng **Pure Functions** để tăng tính ổn định, dễ viết Unit Test và tránh các phản ứng phụ (Side-effects) ngoài ý muốn.
* **Định nghĩa**: Một hàm được coi là thuần khiết khi đầu ra (output) của nó **chỉ phụ thuộc** duy nhất vào tham số đầu vào (inputs) và không làm biến đổi bất kỳ trạng thái nào ngoài phạm vi của hàm.

#### 💡 Ví dụ về Pure Function (Hàm chuyển đổi dữ liệu):
```typescript
export function convertHeliusSwapToSwapTransaction(parsed: HeliusSwapParsedDto): SwapTransactionDto | null {
  // Chỉ phụ thuộc vào tham số đầu vào 'parsed', không biến đổi biến global nào
  if (!parsed) return null;
  
  const swapTransaction: SwapTransactionDto = {
    signature: parsed.signature,
    date_time: new Date(parsed.timestamp * 1000).toISOString(),
    time: parsed.timestamp * 1000,
    maker: parsed.user,
    token_sent: parsed.fromMint,
    token_received: parsed.toMint,
    amount_sent: parsed.amountIn,
    amount_received: parsed.amountOut,
    dex_contract_address: parsed.dex_contract_address,
    chain: POPULAR_BLOCKCHAINS.SOLANA
  };
  
  return swapTransaction;
}
```

---

## 🛡️ IV. Phòng Vệ Trị Rỗng (Defensive Null Checks)

::: warning ⚠️ NGUYÊN TẮC PHÒNG VỆ
Luôn luôn kiểm tra giá trị `null`/`undefined` trong phạm vi cục bộ của hàm. **Tuyệt đối không tin tưởng hoàn toàn** vào dữ liệu đầu vào hoặc đầu ra từ các hàm khác trả về.
:::

Trước khi truy cập vào bất kỳ thuộc tính sâu nào của object, hãy luôn tự hỏi bản thân:
1. *Chuyện gì xảy ra nếu thuộc tính hoặc biến này bị rỗng (null/undefined)?*
2. *Ứng dụng có bị crash lập tức hay không?*
3. *Hậu quả kéo theo đối với giao diện UI hoặc database là gì?*

#### 🛠️ Kỹ thuật phòng vệ khuyên dùng:
* Sử dụng **Optional Chaining (`?.`)** và **Nullish Coalescing (`??`)** để gán giá trị mặc định an toàn:
  ```typescript
  const userDisplayName = user?.profile?.fullName ?? "Guest User";
  ```

---

## 💬 V. Nghệ Thuật Viết Bình Luận (The Art of Comments)

Viết bình luận (comment) là một kỹ năng cần sự tinh tế của lập trình viên có kinh nghiệm:
* ❌ **Không dùng comment để giải thích cái gì (What)**: Nếu tên biến và tên hàm của bạn được đặt chuẩn, code đã tự giải thích nó chứa cái gì.
* ❌ **Không dùng comment để giải thích như thế nào (How)**: Logic viết gọn gàng, trong sáng sẽ tự thể hiện cách thức vận hành.
* ✅ **Chỉ dùng comment để giải thích TẠI SAO (Why)**: Hãy viết bình luận để giải thích các quyết định thiết kế phức tạp, các giải pháp mang tính workaround bắt buộc, hoặc các nghiệp vụ đặc thù (business rules) không thể hiện rõ qua mã nguồn.

#### ❌ Comment dư thừa (Giải thích What & How):
```javascript
// Tăng giá trị i lên 1 đơn vị
i = i + 1;

// Lấy danh sách token của user
const tokens = getUserTokens(userId);
```

#### ✅ Comment chuẩn chỉ (Giải thích quyết định thiết kế - Why):
```javascript
// Bắt buộc phải trì hoãn 300ms trước khi gọi API để tránh hiện tượng 
// layout bị giật khi bàn phím ảo iOS đóng lại (UI Rendering Throttling)
setTimeout(() => {
  fetchUserData();
}, 300);
```

---

## 📚 VI. Tài Liệu Tham Khảo

Để tiếp tục nâng cao kỹ năng viết code sạch, bạn có thể tham khảo cuốn sách kinh điển của tác giả **Robert C. Martin**:
* 📖 [Clean Code Book (PDF Drive) tại GitHub](https://github.com/Gatjuat-Wicteat-Riek/clean-code-book)

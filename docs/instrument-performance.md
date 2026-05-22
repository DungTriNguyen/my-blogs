---
outline: deep
---

# 🛠️ Tối Ưu Hiệu Năng & Đo Lường RAM/Memory Với Xcode Instruments

Để phản ánh đúng thực tế size Memory và RAM, performance thì nên test trên **real devices** (thiết bị thật). Simulator sử dụng mô-đun và phần cứng của macOS nên tỉ lệ đo đạc của Instruments sẽ không đúng với máy thực.

---

## 📌 I. Những công cụ Instrument để tối ưu phần cứng và phần mềm của ứng dụng

1. **Allocations (Phân bổ bộ nhớ)**
   * **Mục đích**: Theo dõi việc sử dụng bộ nhớ heap và sự tồn tại của các đối tượng.
   * **Chi tiết**: Giúp bạn biết ứng dụng đang sử dụng bao nhiêu bộ nhớ, các đối tượng nào đang chiếm dụng nhiều nhất và lịch sử phân bổ của chúng.

2. **Leak (Rò rỉ bộ nhớ)**
   * **Mục đích**: Tìm các đối tượng không còn được sử dụng nhưng vẫn chiếm bộ nhớ.
   * **Chi tiết**: Giúp giải phóng bộ nhớ bị lãng phí, ngăn chặn tình trạng ứng dụng bị hệ thống tắt do dùng quá nhiều RAM.

3. **os_signpost**
   * **Mục đích**: Đánh dấu các điểm hoặc khoảng thời gian cụ thể trong mã nguồn.
   * **Chi tiết**: Cho phép nhà phát triển tạo ra các "cột mốc" tùy chỉnh để đo lường hiệu suất của các đoạn code cụ thể trong biểu đồ thời gian của Instruments.

4. **VM Tracker (Theo dõi bộ nhớ ảo)**
   * **Mục đích**: Cung cấp cái nhìn sâu hơn về việc sử dụng bộ nhớ ảo (Virtual Memory).
   * **Chi tiết**: Theo dõi các vùng bộ nhớ như "Dirty Memory" hay "Compressed Memory", giúp tối ưu hóa tổng lượng tài nguyên hệ thống mà ứng dụng tiêu thụ.

5. **Thermal State (Trạng thái nhiệt)**
   * **Mục đích**: Theo dõi mức độ sinh nhiệt của thiết bị khi chạy ứng dụng.
   * **Chi tiết**: Giúp nhà phát triển hiểu ứng dụng ảnh hưởng thế nào đến nhiệt độ thiết bị, từ đó điều chỉnh hiệu năng để tránh làm máy quá nóng dẫn đến giảm xung nhịp (throttling).

6. **Hang (Treo ứng dụng)**
   * **Mục đích**: Phát hiện các lỗi khiến giao diện người dùng (UI) bị đơ hoặc không phản hồi.
   * **Chi tiết**: Phân tích các luồng (threads) để tìm ra nguyên nhân gây nghẽn luồng chính (main thread).

---

## 📊 II. Chú thích các value name trong cột của Instruments

### 1. Allocations (Phân bổ bộ nhớ)
* **Persistent**: Số lượng đối tượng hiện đang tồn tại trong bộ nhớ và chưa được giải phóng.
  * **Anonymous VM**: Vùng virtual memory riêng tư của process. Anonymous VM không đại diện cho toàn bộ memory mà app dùng. Nó bao gồm dirty size và virtual size. Anonymous VM được dùng để theo dõi một phần memory process trong runtime, nhất là khi bạn làm các tác vụ như:
    * Scroll list
    * Decode image
    * Tạo buffer/native region
    * Một số graphics / Metal / IOAccelerator related allocations
  * **Heap Allocations**: Những thứ app và thư viện xin thêm bộ nhớ động khi đang chạy (hermes - JS Thread).
    * Toàn bộ các Object, Array, String trong code JavaScript của bạn.
    * Các State (useState, Redux, React Query cache).
    * Các thực thể (instances) của các class hoặc component.
* **Transient**: Số lượng đối tượng đã được tạo ra và sau đó được giải phóng (tồn tại tạm thời).
* **Total Bytes**: Tổng dung lượng bộ nhớ mà các đối tượng đang chiếm giữ.
* **Category**: Loại đối tượng hoặc lớp (class) được phân bổ.

### 2. Leak (Rò rỉ bộ nhớ)
* **Count**: Số lượng các vùng nhớ bị rò rỉ (không còn địa chỉ tham chiếu nhưng chưa được giải phóng).
* **Size**: Tổng dung lượng bộ nhớ bị lãng phí do các lỗi rò rỉ này.
* **Responsible Library**: Thư viện hoặc khung (framework) chứa đoạn mã gây ra rò rỉ.
* **Responsible Frame**: Hàm hoặc phương thức cụ thể dẫn đến việc phân bổ bộ nhớ bị rò rỉ.

### 3. os_signpost
* **Name**: Tên của sự kiện hoặc khoảng thời gian (interval) mà bạn đã đặt trong mã nguồn.
* **Category**: Nhãn phân loại để nhóm các signpost liên quan.
* **Duration**: Khoảng thời gian thực thi của một tác vụ (giữa begin và end).
* **Count**: Số lần một sự kiện signpost cụ thể được kích hoạt.

### 4. VM Tracker (Theo dõi bộ nhớ ảo)
* **Dirty Size**: Dung lượng bộ nhớ thực tế đã được ứng dụng ghi dữ liệu vào và hiện đang nằm trong RAM hoặc swap (Quan trọng). Dirty Size là phần memory mà process đã ghi vào và không còn là clean/file-backed page đơn thuần, nên hệ thống xem đó là phần memory “riêng” và “đắt” hơn. Dirty size dùng để đo lường RAM pressure. Dirty size càng lớn RAM pressure càng cao.
* **Resident Size**: Tổng dung lượng các memory pages của process đang resident tại thời điểm snapshot.
* **Virtual Size**: Tổng không gian địa chỉ ảo mà ứng dụng đã yêu cầu hệ điều hành cung cấp.
* **Swapped Size**: Là dung lượng bộ nhớ mà hệ điều hành tạm thời chuyển RAM vật lý sang một không gian lưu trữ khác để nhường chỗ cho các tác vụ đang cần ưu tiên.

### 5. Thermal State (Trạng thái nhiệt)
* **Thermal State**: Trạng thái nhiệt độ của thiết bị (ví dụ: Nominal - bình thường, Fair - ấm, Serious - nóng, Critical - cực nóng).
* **Timestamp**: Thời điểm ghi nhận sự thay đổi về trạng thái nhiệt.

### 6. Hang
* **Duration**: Thời gian mà luồng chính (Main Thread) bị khóa hoặc không phản hồi (thường tính bằng mili giây hoặc giây).
* **Hang Severity**: Mức độ nghiêm trọng của lỗi treo (ví dụ: Micro-hang hoặc Severe hang).
* **Call Tree**: Danh sách các hàm đang chạy tại thời điểm xảy ra hiện tượng treo để xác định nguyên nhân gây nghẽn.

---

## 🛠️ III. Cách Debug trên Xcode Instruments

Trước khi Debug, cần phải tạo 2 file native `RNSignpost.swift` và `RNSignpost.m`, 1 file `signpost-test.ts` và 1 file plugins `withRNSignpost.js`:

### 1. Cấu hình các file mã nguồn

#### File `RNSignpost.swift`
```swift
import Foundation
import os.signpost

@objc(RNSignpost)
class RNSignpost: NSObject {

  private let log = OSLog(subsystem: "com.yourapp.rn", category: "ReactNative")

  @objc func beginEvent(_ name: String) {
    if #available(iOS 12.0, *) {
      os_signpost(.begin, log: log, name: "RN Event", "%{public}s", name)
    }
  }

  @objc func endEvent(_ name: String) {
    if #available(iOS 12.0, *) {
      os_signpost(.end, log: log, name: "RN Event", "%{public}s", name)
    }
  }

  @objc func emitEvent(_ name: String) {
    if #available(iOS 12.0, *) {
      os_signpost(.event, log: log, name: "RN Event", "%{public}s", name)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool { return false }
}
```

#### File `RNSignpost.m`
```objc
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSignpost, NSObject)
RCT_EXTERN_METHOD(beginEvent:(NSString *)name)
RCT_EXTERN_METHOD(endEvent:(NSString *)name)
RCT_EXTERN_METHOD(emitEvent:(NSString *)name)
@end
```

#### File `libs/signpost-test.ts`
```typescript
import { NativeModules, Platform } from 'react-native';

const { RNSignpost } = NativeModules;

export const signpost = {
  begin: (name: string) => {
    if (Platform.OS === 'ios' && RNSignpost) {
      RNSignpost.beginEvent(name);
    }
  },
  end: (name: string) => {
    if (Platform.OS === 'ios' && RNSignpost) {
      RNSignpost.endEvent(name);
    }
  },
  event: (name: string) => {
    if (Platform.OS === 'ios' && RNSignpost) {
      RNSignpost.emitEvent(name);
    }
  },
};
```

#### File `withRNSignpost.js`
```javascript
const { withXcodeProject } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const FILES = ['RNSignpost.swift', 'RNSignpost.m'];

const withRNSignpost = (config) => {
  // Lưu ý: Thêm biến môi trường để lên production không cần phải thêm File nhé ^^
  const isProduction = process.env.EXPO_PUBLIC_APP_XCODE_INSTRUMENT === 'production';
  if (isProduction) {
    console.log('[withRNSignpost] 🚫 Skipping in production build');
    return config;
  }

  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;
    const projectRoot = config.modRequest.projectRoot;
    const platformRoot = config.modRequest.platformProjectRoot;

    const appName = fs.readdirSync(platformRoot).find((f) => {
      const fullPath = path.join(platformRoot, f);
      try {
        return (
          fs.statSync(fullPath).isDirectory() &&
          (
            fs.existsSync(path.join(fullPath, 'AppDelegate.swift')) ||
            fs.existsSync(path.join(fullPath, 'AppDelegate.mm')) ||
            fs.existsSync(path.join(fullPath, 'AppDelegate.m'))
          )
        );
      } catch { return false; }
    });

    if (!appName) {
      console.warn('[withRNSignpost] ⚠️ App directory not found');
      return config;
    }

    const targetDir = path.join(platformRoot, appName);
    const sourceDir = path.join(projectRoot, 'plugins', 'native');
    const target = xcodeProject.getFirstTarget();

    if (!target) {
      console.warn('[withRNSignpost] ⚠️ No target');
      return config;
    }

    const pbxGroupSection = xcodeProject.hash.project.objects['PBXGroup'] || {};
    let mainGroupUUID = null;

    for (const [uuid, group] of Object.entries(pbxGroupSection)) {
      if (uuid.endsWith('_comment')) continue;
      const name = (group.name || group.path || '').replace(/"/g, '').trim();
      if (name === appName) {
        mainGroupUUID = uuid;
        break;
      }
    }

    if (!mainGroupUUID) {
      const projectSection = xcodeProject.hash.project.objects['PBXProject'] || {};
      for (const [uuid, proj] of Object.entries(projectSection)) {
        if (uuid.endsWith('_comment')) continue;
        mainGroupUUID = proj.mainGroup;
        break;
      }
    }

    for (const fileName of FILES) {
      const src = path.join(sourceDir, fileName);
      const dest = path.join(targetDir, fileName);

      if (!fs.existsSync(src)) {
        console.warn(`[withRNSignpost] ⚠️ Not found: ${src}`);
        continue;
      }

      fs.copyFileSync(src, dest);

      const buildPhase = xcodeProject.pbxSourcesBuildPhaseObj(target.uuid);
      const fileRefs = xcodeProject.pbxFileReferenceSection();

      const alreadyAdded = buildPhase?.files?.some((f) => {
        const ref = fileRefs[f.value];
        const refPath = (ref?.path || '').replace(/"/g, '');
        const refName = (ref?.name || '').replace(/"/g, '');
        return refName === fileName || refPath === fileName || 
               refPath === `${appName}/${fileName}`;
      });

      if (alreadyAdded) {
        console.log(`[withRNSignpost] ⏭️ ${fileName} already added`);
        continue;
      }

      const fileRefUUID = xcodeProject.generateUuid();
      const buildFileUUID = xcodeProject.generateUuid();

      xcodeProject.hash.project.objects['PBXFileReference'][fileRefUUID] = {
        isa: 'PBXFileReference',
        lastKnownFileType: fileName.endsWith('.swift')
          ? 'sourcecode.swift'
          : 'sourcecode.c.objc',
        name: `"${fileName}"`,              
        path: `"${appName}/${fileName}"`,   
        sourceTree: '"SOURCE_ROOT"',     
        fileEncoding: 4,
      };
      xcodeProject.hash.project.objects['PBXFileReference'][`${fileRefUUID}_comment`] = fileName;

      xcodeProject.hash.project.objects['PBXBuildFile'][buildFileUUID] = {
        isa: 'PBXBuildFile',
        fileRef: fileRefUUID,
      };
      xcodeProject.hash.project.objects['PBXBuildFile'][`${buildFileUUID}_comment`] =
        `${fileName} in Sources`;

      const group = xcodeProject.hash.project.objects['PBXGroup'][mainGroupUUID];
      if (group?.children) {
        group.children.push({ value: fileRefUUID, comment: fileName });
      }

      if (buildPhase) {
        buildPhase.files.push({
          value: buildFileUUID,
          comment: `${fileName} in Sources`,
        });
      }

      console.log(`[withRNSignpost] ✅ Added ${fileName}`);
    }

    return config;
  });
};

module.exports = withRNSignpost;
```

Mục đích của 2 file native này là để tạo log event trên JS code để dễ track được trace event theo từng giai đoạn. Bạn cần thêm plugin đường dẫn của file `withRNSignpost` vào trong plugins của `app.json`. Khi chạy `npx expo prebuild`, đảm bảo 2 file `RNSignpost.swift` và `RNSignpost.m` được tự động thêm vào dự án iOS.

---

### 2. Debug Memory Leaks

Tạo signpost (giống như tạo console log) để track được đoạn code bị leak memory:
* `signpost.begin("{NAME_EVENT}")`: Khởi tạo sự kiện
* `signpost.end("{NAME_EVENT}")`: Kết thúc sự kiện
* `signpost.event("{EMMIT_EVENT}")`: Nhúng sự kiện (Nên sử dụng sau khi return output)

Ví dụ trong 1 component bị leak:
* **Bước 1 (Xác định số lượng)**: Tổng leaked objects ở header khoảng 89 leaks.
* **Bước 2 (Xác định khoảng leaks)**: Chuyển sang mục tabs `os_signpost` và tìm kiếm `{NAME_EVENT}` hoặc `{EMMIT_EVENT}` và chuyển filter thành `List:Metadata`.
* **Bước 3 (Tìm lỗi và sửa)**: Chúng nên chia nhỏ từng record để dễ dàng trace và fix lỗi.

---

### 3. Debug RAM allocation

* **Bước 1**: Tạo nhiều Record để test chính xác của một flow (Ví dụ: Home Screen gồm 2 records để kiểm tra tính sai số của RAM).
  ::: info Lưu ý
  Xem tổng thời gian runtime trong time profiler ở cột Weight 100% của các records phải xấp xỉ bằng nhau hoặc cách nhau tối đa 2s để sai số không quá cao.
  :::
* **Bước 2**: Mở Record và xem ở phần allocation **All Heap & Anonymous VM** để giám sát RAM được cấp phát theo process khi runtime đang diễn ra. Mỗi lần đo phải dùng cùng một flow, không test ngẫu nhiên.
  * *Đánh giá sơ bộ*: All heap < All anonymous VM (Mức tốt).
  * *Nếu All heap >= All anonymous VM*: Hermes (JS Thread) đang xử lý quá nặng, cần phải tối ưu lại.
* **Bước 3 (Đánh giá thứ tự dựa trên Metric)**:
  * **Nhóm A — allocation app đang giữ (Dùng trong Statistics)**:
    * All Anonymous VM
    * All Heap & Anonymous VM
    * All Heap Allocations
  * **Nhóm B — pressure / footprint gần đúng (Dùng trong Summary / VM)**:
    * Dirty Size (Dirty size dùng để đo lường RAM pressure. Dirty size càng lớn RAM pressure càng cao)
    * Swapped
    * Gần đúng pressure: `Pressure ≈ Dirty + Swapped`
  * **Nhóm C — toàn cảnh process**:
    * Resident Size (Để biết process được ghi vào RAM đang “to” tới mức nào)
  * **Nhóm D — bucket con (nếu có) của Anonymous VM**:
    * Nếu thấy app nặng, phải nhìn thêm: `VM: CG raster data`, `VM: ImageIO_*`, `VM: CoreAnimation`, `VM: IOSurface`, `VM: Stack`.
  * So sánh metric giữa 2 records và đưa ra đánh giá sự biến động memory consume. Sau đó, chọn 1 record có tổng thông số thấp hơn làm kết luận.

* **Bước 4 (Kết luận - RAM 4 GB)**:
  Một trace được đánh giá theo 3 chỉ số:
  1. **Chỉ số 1 — App-held**: `AppHeld = All Heap & Anonymous VM`
  2. **Chỉ số 2 — Pressure**: `Pressure = Dirty + Swapped`
  3. **Chỉ số 3 — Gap nguyên nhân**: `Gap = Pressure - AppHeld` (Giải thích memory tăng đến từ heap+anonymous hay từ image/render/native buckets khác)
  * `Peak` = giá trị cao nhất của một metric trong một record / một flow test.
  
  Đặt ra khoảng tối ưu về app sử dụng khoảng bao nhiêu dung lượng là rất khó ước tính, nó còn tùy vào độ “phình to” của app theo thời gian. Nên ở đây ta rút ra một số điều kiện về tối ưu phần cứng, pin sao cho User khi sử dụng app cảm thấy không bị lag, tụt pin, nóng máy hoặc bị kill app do tràn bộ nhớ:

  * **AppHeld**:
    * Tốt nhất: `< 5%` RAM máy
    * Chấp nhận được: `5–7%`
    * Cảnh báo: `7–9%`
    * Nặng: `> 9%`
  * **Pressure**:
    * Tốt nhất: `< 6%` RAM máy
    * Chấp nhận được: `6–8%`
    * Cảnh báo: `8–10%`
    * Nặng: `> 10%`
  
  ::: warning Lưu ý
  Đây những mức tối ưu nhất khi User lần đầu mở app. Nhưng theo thời gian User interaction trong khoảng thời gian dài → Dữ liệu càng lớn → cache càng nhiều → RAM tăng.
  :::

---

### VÍ DỤ 1: Record chưa Optimize

* **Bước 1**: Tạo 2 record để đối chiếu sai số.
  * **Record 1**: Có tổng Runtime là 39.03s.
  * **Record 2**: Có tổng Runtime là 38.03s.
* **Bước 2**: Đánh giá sơ bộ của cả 2 Record đều Tốt. Xem Runtime profiler của 2 record nếu gần bằng nhau hoặc chênh lệch nhau không quá nhiều thì có thể tiến hành so sánh 2 records này ở bước 3.
* **Bước 3**:

| Metric | Record 1 (39.03s) | Record 2 (38.03s) |
| :--- | :--- | :--- |
| **Nhóm A** | - Tổng All Heap & anonymous VM đang giữ và chưa giải phóng: **283.44 MB**<br>- All Heap allocation = 64.22 MB<br>- All anonymous VM = 219.22 MB<br>- # Persistent = 1,183<br>- # Transient = 1,118 | - Tổng All Heap & anonymous VM đang giữ và chưa giải phóng: **255.45 MB**<br>- All Heap allocation = 58.20 MB<br>- All anonymous VM = 197.25 MB<br>- # Persistent = 1,186<br>- # Transient = 1,079 |
| **Nhóm B** | - Dirty Size = 398.48 MB<br>- Swapped Size = 32 KiB | - Dirty Size = 371.32 MB<br>- Swapped Size = 32 KiB |
| **Nhóm C** | - Resident Size = 1.06 GB | - Resident Size = 1.21 GB |
| **Nhóm D** | - VM: CG raster data = 164.94 MiB<br>- # total = 254 | - VM: CG raster data = 143.72 MB<br>- # total = 254 |

* **Đánh giá**:
  * Resident size của record 2 cao hơn record 1.
  * Process RAM performance đang cực nặng khi cả 2 records đều trên 1 GB (cần tối ưu).
  * CG raster data của record 2 thấp hơn record 1.
  * Dirty size record 2 thấp hơn record 1.
  * => Lấy **record 2** làm kết luận.

* **Bước 4 (Kết luận - Record 2 trên thiết bị RAM 4GB)**:
  * **AppHeld** = 255.45 MB: Nằm trong vùng chấp nhận được, nhưng đã khá cao, cho thấy app/runtime đang giữ một lượng allocation tương đối lớn.
  * **Pressure** = 371.32 MB: Nằm trong vùng cảnh báo mạnh / nặng. Đây là chỉ số đáng lo nhất của record này, nghĩa là app đang tạo áp lực bộ nhớ khá lớn trên thiết bị thật.
  * **Resident** = 1.21 GB: Process đang rất to, xác nhận snapshot này là một trạng thái memory nặng thật, không phải tăng nhẹ.
  * **Gap** = 115.87 MB: Gap ở mức trung bình khá lớn, nghĩa là pressure không chỉ đến từ Heap & Anonymous VM mà còn đến đáng kể từ các bucket khác như image, raster, render, native allocations.
  * **=> Kết luận chung**: Cần optimize lại toàn bộ.

---

### VÍ DỤ 2: Record đã Optimized

* **Bước 1**: Tạo 2 record để đối chiếu sai số.
  * **Record 1**: Có tổng Runtime là 33.31s.
  * **Record 2**: Có tổng Runtime là 32.09s.
* **Bước 2**: Đánh giá sơ bộ cả 2 Record đều Tốt. Xem time profiler của 2 record nếu gần bằng nhau hoặc chênh lệch nhau không quá nhiều thì có thể tiến hành so sánh ở bước 3.
* **Bước 3**:

| Metric | Record 1 (33.31s) | Record 2 (32.09s) |
| :--- | :--- | :--- |
| **Nhóm A** | - Tổng All Heap & anonymous VM đang giữ và chưa giải phóng: **165.36 MB**<br>- All Heap allocation = 39.04 MB<br>- All anonymous VM = 126.31 MB<br>- # Persistent = 518<br>- # Transient = 2,540 | - Tổng All Heap & anonymous VM đang giữ và chưa giải phóng: **185.23 MB**<br>- All Heap allocation = 38.20 MB<br>- All anonymous VM = 147.03 MB<br>- # Persistent = 522<br>- # Transient = 2,158 |
| **Nhóm B** | - Dirty Size = 260.70 MB<br>- Swapped Size = 32 KiB | - Dirty Size = 277.62 MB<br>- Swapped Size = 32 KiB |
| **Nhóm C** | - Resident Size = 1 GB | - Resident Size = 1.01 GB |
| **Nhóm D** | - VM: CG raster data = 84.89 MiB<br>- # total = 476 | - VM: CG raster data = 105.70 MB<br>- # total = 440 |

* **Đánh giá**:
  * Resident size của record 1, 2 tương đương nhau.
  * Process RAM performance đang cực nặng khi cả 2 records đều trên 1 GB (cần tối ưu).
  * CG raster data của record 1 thấp hơn record 2.
  * All Heap allocation của record 1 cao hơn record 2.
  * All Heap & anonymous VM của record 1 thấp hơn record 2.
  * Dirty size record 1 thấp hơn record 2.
  * => Lấy **record 1** làm kết luận.

* **Bước 4 (Kết luận — Record 1 trên thiết bị RAM 4GB)**:
  * **AppHeld** = 165.36 MB: Nằm trong vùng tốt, cho thấy phần allocation app/runtime đang giữ lại ở mức thấp và tương đối tối ưu.
  * **Pressure** = 260.70 MB: Nằm trong vùng chấp nhận được, nghĩa là app đã tạo ra memory pressure ở mức vừa phải nhưng chưa vượt ngưỡng cảnh báo.
  * **Resident** = 1 GB: Process đang rất to tại thời điểm snapshot. Chỉ số này không dùng làm pass/fail chính, nhưng cho thấy tổng memory hiện diện của process vẫn lớn.
  * **Gap** = 95.34 MB: Gap ở mức trung bình, cho thấy pressure không chỉ đến từ Heap & Anonymous VM, mà còn đến đáng kể từ các bucket khác như image, raster, render, native allocations.
  * **Kết luận chung**: Record 1 đang ở trạng thái chấp nhận được về mặt pressure, với AppHeld tốt, nhưng tổng process size vẫn lớn. Memory hiện tại chưa ở mức bất thường, tuy nhiên vẫn cần tiếp tục tối ưu ở các bucket liên quan đến image / raster / render / native memory để kéo Resident Size xuống thấp hơn.

---

## 🚀 IV. Cẩm Nang Giải Pháp & Hướng Dẫn Tối Ưu Hiệu Năng Thực Tế (Senior Mobile Developer Guidelines)

Dưới góc độ một **Senior Mobile Engineer**, việc tối ưu hiệu năng không chỉ là sửa lỗi sau khi code chạy, mà là việc áp dụng các architectural patterns chuẩn xác ngay từ khâu thiết kế để tối ưu hóa quy trình làm việc và tránh các bẫy tràn bộ nhớ (RAM Out-Of-Memory) phổ biến. Dưới đây là 6 giải pháp cốt lõi để nâng tầm hiệu năng ứng dụng React Native & Expo:

### 1. 📱 Tối ưu hóa render Danh sách dài (List Performance & Memory Recycle)

Đối với các màn hình chứa danh sách dài các items (đặc biệt trong các dự án E-Commerce hoặc mạng xã hội), **tuyệt đối không sử dụng `map()` hoặc `ScrollView`** để hiển thị mặc định. Việc dùng `map()` hoặc `ScrollView` thuần sẽ ép buộc hệ thống phải render **toàn bộ** danh sách các phần tử ngay từ đầu kể cả khi chúng không nằm trong Viewport (khung nhìn), gây sụt giảm FPS cực kỳ nghiêm trọng và tràn RAM tức thì.

#### 💡 Giải pháp 1: Ưu tiên sử dụng FlashList (Shopify)
`FlashList` được thiết kế để thay thế hoàn hảo cho `FlatList` của React Native với khả năng tái chế ô nhớ (cell recycling) vượt trội giúp tối ưu hóa sâu hiệu năng.

##### 📊 So sánh chi tiết giữa FlatList (React Native) và FlashList (Shopify)

| Tiêu chí | FlatList (React Native default) | FlashList (Shopify) |
| :--- | :--- | :--- |
| **Cơ chế hoạt động** | **Mount/Unmount**: Tạo mới component khi cuộn vào viewport và phá hủy khi cuộn ra ngoài. | **Recycling**: Tái sử dụng lại các Component Cell đã được mount trước đó và chỉ thay thế data mới vào. |
| **Mức độ RAM tiêu thụ** | RAM tăng liên tục và không ổn định do tiến trình Garbage Collector hoạt động liên tục. | RAM luôn được giữ ở mức cực kỳ thấp và phẳng ổn định. |
| **Tốc độ phản hồi (FPS)** | Dễ bị hiện tượng "màn hình trắng" (blank screen) khi cuộn cực nhanh vì JS Thread không kịp mount. | Mượt mà 60 FPS, triệt tiêu hoàn toàn màn hình trắng khi cuộn nhanh. |
| **Thời gian khởi động ban đầu** | Chậm hơn vì cần khởi tạo layout từng phần tử độc lập. | Cực kỳ nhanh nhờ cơ chế tính toán trước kích thước cell (`estimatedItemSize`). |

##### 🛠️ Cú pháp tối ưu mẫu với FlashList:
```typescript
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={products}
  renderItem={renderItem}
  keyExtractor={(item) => String(item.id)}
  estimatedItemSize={260} // Bắt buộc phải sát thực tế nhất để tối ưu hóa đo đạc layout
  removeClippedSubviews={Platform.OS === 'android'} // Tối ưu thêm cho thiết bị Android
/>
```

#### 💡 Giải pháp 2: Xử lý màn hình chứa nhiều cấu trúc danh sách khác nhau
Nếu một màn hình chứa nhiều list có cấu trúc data khác nhau (ví dụ: Banner List, Categories List, Hot Deals, Product Grid), chúng ta có hai hướng xử lý chuẩn chỉ:
* **Phương án A**: Sử dụng **SectionList** từ thư viện React Native để quản lý cấu trúc dữ liệu phân nhóm chặt chẽ.
* **Phương án B**: Sử dụng **FlashList** kết hợp các thuộc tính `ListHeaderComponent` và `ListFooterComponent` để lồng các list phụ vào bên trong. Cách này giúp giữ toàn bộ màn hình trong cùng một Flat/Flash context duy nhất, hạn chế lồng ghép nhiều ScrollView làm xung đột cơ chế tái chế ô nhớ.

---

### 2. 🔀 Quản lý Điều hướng thông minh (Navigation Stack Control)

Trong quá trình phát triển ứng dụng di động, hành vi điều hướng ảnh hưởng trực tiếp đến sự "phình to" của các screen stack trong bộ nhớ.

> [!IMPORTANT]
> **Quy tắc vàng:** Sử dụng `router.navigate()` thay vì `router.push()` cho việc chuyển hướng thông thường.

* **`router.navigate(route)`**: Sẽ tìm kiếm trong ngăn xếp (navigation stack) xem màn hình đích đã tồn tại chưa. Nếu màn hình đó đã nằm trong stack trước đó, nó sẽ **lấy lại stack cũ** để chuyển hướng và cập nhật lại dữ liệu mới, giữ cho tổng số screen hoạt động ở mức tối thiểu.
* **`router.push(route)`**: Luôn luôn **khởi tạo mới hoàn toàn** một instance màn hình và đẩy thêm vào đỉnh của stack cũ mà không quan tâm màn hình này đã từng được mở trước đó hay chưa. Sử dụng lạm dụng `push` sẽ tạo ra một hàng dài các màn hình chạy ngầm không được giải phóng, gây rò rỉ RAM khổng lồ theo thời gian interaction của user.

---

### 3. 🎥 Xử lý Video chạy ngầm & Tránh rò rỉ bộ nhớ với `useVideoPlayer`

Khi làm việc với các thư viện phát video như `expo-video` hoặc `react-native-video`, một lỗi cực kỳ phổ biến của junior developer là chuyển màn hình nhưng video cũ vẫn chạy ẩn ở background.

::: danger 🔥 NGUY HIỂM: Rò rỉ bộ nhớ phần cứng nặng
Việc để video tiếp tục chạy ngầm khi màn hình không còn hiển thị sẽ khiến phần cứng thiết bị (GPU/Decoder) hoạt động liên tục, gây sụt pin nghiêm trọng, làm nóng máy đột ngột, và tạo ra một leak bộ nhớ cực lớn không thể tự động giải phóng.
:::

#### 🛠️ Giải pháp: Thực hiện ngắt phát video chủ động khi rời khỏi màn hình
Chúng ta nên sử dụng Hook `useFocusEffect` kết hợp với kiểm tra vòng đời của player để ép buộc dừng hẳn luồng phát:

```typescript
import { useFocusEffect } from 'expo-router';
import { useVideoPlayer } from 'expo-video';
import React, { useCallback } from 'react';

export default function VideoScreen() {
  const player = useVideoPlayer('https://link-to-your-video.mp4');

  useFocusEffect(
    useCallback(() => {
      // Khi màn hình đang được Focus
      player?.play?.();

      return () => {
        // Hàm cleanup này chạy tự động KHI màn hình bị blur (user rời đi)
        if (player) {
          player.pause(); // Ép dừng luồng giải mã video để giải phóng RAM/GPU
        }
      };
    }, [player])
  );

  // Render video component...
}
```

---

### 4. 🎠 Tối ưu hóa Carousel (Slide trình chiếu ảnh/sản phẩm)

Carousel là component tiêu thụ rất nhiều tài nguyên đồ họa nếu không được cấu hình giới hạn số lượng ảnh tải trước.

::: tip 💡 Tối ưu hóa với `windowSize`
Khi làm việc với các thư viện Carousel nổi tiếng (ví dụ như `react-native-reanimated-carousel`), bạn **bắt buộc phải sử dụng thuộc tính `windowSize={number}`** (tham khảo [rn-carousel props](https://rn-carousel.dev/props)).
:::

* **Cơ chế**: `windowSize={number}` quy định số lượng phần tử slide tối đa được phép render thực tế vào bộ nhớ xung quanh vị trí slide hiện tại đang hiển thị.
* **Tác dụng**: Việc đặt `windowSize` hợp lý (thường từ `3` đến `5` phần tử) sẽ triệt tiêu việc tải trước vô hạn các slide khác trong danh sách, giúp bảo vệ RAM không bị tăng vọt (spikes) trong suốt quá trình vuốt slide của người dùng.

---

### 5. 🖼️ Quy tắc Tối Ưu Hóa Đường Ống Hình Ảnh (Image Pipeline)
Hình ảnh là nguyên nhân hàng đầu gây phình bộ nhớ.
* **Nguyên tắc phân cấp ảnh**:
  * **Trang danh sách (List View)**: Chỉ sử dụng ảnh thu nhỏ (Thumbnail). Không được phép tải trực tiếp ảnh gốc.
  * **Trang chi tiết (Detail View)**: Sử dụng ảnh chất lượng trung bình (Medium).
  * **Trang xem phóng to (Gallery/Zoom)**: Tải ảnh gốc (Original).
* **Hỗ trợ phía Backend**: Thiết lập các CDN hỗ trợ API resize ảnh linh hoạt, hoặc lập lịch tạo sẵn các phiên bản Thumbnail nhỏ từ phía server.
* **Sử dụng thư viện `expo-image` đúng cách**:
  ```typescript
  // KHUYÊN DÙNG (Tối ưu sâu)
  <Image
    source={{ uri: imageUrl }}
    contentFit="cover"
    recyclingKey={String(id)}
    enforceEarlyResizing // Ép buộc resize sớm
    allowDownscaling     // Cho phép giảm tỷ lệ khi vượt quá vùng hiển thị
    cachePolicy="memory-disk"
    transition={100}
  />
  ```
  * ❌ **Không nên**: Tải cùng một ảnh gốc cho cả trang list và detail, preload quá nhiều ảnh cùng lúc, hoặc xóa cache ảnh global mỗi khi component mount.

---

### 6. 🎨 Quy tắc Giảm Tải CG Raster Data
* Tránh sử dụng kích thước thẻ chứa (`View`, `Image`) lớn vượt mức nhu cầu thực tế cần hiển thị trên màn hình.
* Hạn chế tối đa việc thiết lập các layer hiệu ứng đổ bóng phức tạp chồng lấn lên nhau trên cùng một Card UI.
* Tránh render quá nhiều ảnh có thuộc tính hiển thị (visible) đồng thời trên một màn hình cuộn.

---

### 7. ⏱️ Quy tắc Quản Lý Vòng Đời Màn Hình (Screen Lifecycle)
* **unmountOnBlur**: Nên áp dụng đối với các tab nặng như trang Tìm Kiếm (Search) để giải phóng toàn bộ tài nguyên khi người dùng chuyển sang màn hình khác.
* **freezeOnBlur**: Chỉ sử dụng khi bạn thực sự muốn bảo lưu trạng thái UX mà người dùng đang dở dang. Lưu ý: Lệnh này **không giải phóng** RAM.
* **Nguyên tắc**: Màn hình nào không cần thiết giữ nguyên trạng thái UI cũ thì bắt buộc phải unmount để nhường tài nguyên cho các màn hình phía trên.

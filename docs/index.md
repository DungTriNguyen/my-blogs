---
layout: home
---

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = ref([
  {
    id: 1,
    title: '📱 Giao Diện Dashboard App Di Động',
    desc: 'Sản phẩm React Native Dark Mode hoàn chỉnh với hệ thống thẻ tài chính và đồ thị phân tích dữ liệu trực quan trực tiếp trên thiết bị.',
    image: '/app_dashboard.png'
  },
  {
    id: 2,
    title: '🧼 Cấu Trúc Mã Nguồn Đạt Chuẩn Clean Code',
    desc: 'Thiết kế hệ thống tối giản, phân chia logic và UI rõ ràng, tối ưu hóa kích thước bundle và triệt tiêu render thừa thãi.',
    image: '/clean_code_ide.png'
  },
  {
    id: 3,
    title: '🛠️ Xcode Instruments & Tối Ưu RAM',
    desc: 'Đo lường chi tiết rò rỉ bộ nhớ (Leaks), Allocations và áp dụng các giải pháp cuộn mượt mà đạt 60FPS tuyệt đối.',
    image: '/performance_metrics.png'
  }
])

const activeIndex = ref(0)
let timer = null

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length
}

const setSlide = (index) => {
  activeIndex.value = index
}

onMounted(() => {
  timer = setInterval(nextSlide, 3500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<div class="custom-hero-wrapper">
  <div class="glow-blob blob-1"></div>
  <div class="glow-blob blob-2"></div>
  <div class="glow-blob blob-3"></div>
  <div class="custom-hero-content">
    <div class="hero-badge">
      <span>💻 THỰC CHIẾN • TỐI ƯU • CLEAN CODE</span>
    </div>
    <h1 class="hero-title">
      <span class="title-name">Dũng Nguyễn</span>
      <span class="title-sub">Technical Blog</span>
    </h1>
    <p class="hero-tagline">
      Nơi chia sẻ kinh nghiệm thực chiến lập trình React Native, tối ưu hiệu năng chuyên sâu và nghệ thuật viết Code Sạch.
    </p>
    <div class="hero-actions">
      <a href="#blog-section" class="btn btn-primary">
        <span>🚀 Khám Phá Blog</span>
      </a>
      <a href="/clean-code" class="btn btn-secondary">
        <span>🧼 Clean Code</span>
      </a>
    </div>
  </div>
</div>

<div id="blog-section" class="blog-grid-container vp-doc">
  <div class="section-header">
    <h2 class="section-title">📚 Danh Sách Bài Viết Chuyên Sâu</h2>
    <p class="section-subtitle">Tổng hợp kinh nghiệm thực tế, giải pháp tối ưu hệ thống và chuẩn hóa mã nguồn di động.</p>
  </div>
  <div class="blog-grid">
    <a href="/react-native-with-firebase-fcm" class="blog-card card-rn">
      <div class="card-tag tag-rn">React Native</div>
      <div class="card-title">📱 Tích Hợp Firebase FCM</div>
      <p class="card-desc">Thiết lập chi tiết Push Notification trên iOS & Android sử dụng mô hình kết nối chuẩn, chứng chỉ APNs và Expo Prebuild sạch sẽ.</p>
      <div class="card-footer">Đọc bài viết <span class="arrow">→</span></div>
    </a>
    <a href="/hot-updater-cloudflare-react-native" class="blog-card card-rn">
      <div class="card-tag tag-rn">React Native</div>
      <div class="card-title">⚡ Tự Host OTA Hot Updater</div>
      <p class="card-desc">Giải pháp phân phối cập nhật JavaScript bundle tức thì thay thế CodePush tự vận hành trên AWS S3/Cloudflare R2 + Lambda@Edge.</p>
      <div class="card-footer">Đọc bài viết <span class="arrow">→</span></div>
    </a>
    <a href="/google-react-native-authentication" class="blog-card card-rn">
      <div class="card-tag tag-rn">React Native</div>
      <div class="card-title">🔐 Google Sign-In Trong Expo</div>
      <p class="card-desc">Cấu hình OAuth Client IDs và cách vượt qua lỗi chuyển hướng Deep Link của thư viện mặc định trên môi trường Production.</p>
      <div class="card-footer">Đọc bài viết <span class="arrow">→</span></div>
    </a>
    <a href="/instrument-performance" class="blog-card card-perf">
      <div class="card-tag tag-perf">Tối Ưu RAM</div>
      <div class="card-title">🛠️ Xcode Instruments & Hiệu Năng</div>
      <p class="card-desc">Đo lường Allocations, Leaks, VM Tracker và áp dụng thư viện FlashList của Shopify để tối ưu mượt mà danh sách siêu dài.</p>
      <div class="card-footer">Đọc bài viết <span class="arrow">→</span></div>
    </a>
    <a href="/clean-code" class="blog-card card-clean">
      <div class="card-tag tag-clean">Clean Code</div>
      <div class="card-title">🧼 Nghệ Thuật Viết Code Sạch</div>
      <p class="card-desc">Cẩm nang chuẩn đặt tên biến/hàm, triệt tiêu điều kiện lồng nhau bằng kỹ thuật Early Return (Guard Clauses) và viết Pure Functions.</p>
      <div class="card-footer">Đọc bài viết <span class="arrow">→</span></div>
    </a>
    <a href="/learn-code-terminal" class="blog-card card-terminal">
      <div class="card-tag tag-terminal">Terminal</div>
      <div class="card-title">💻 Làm Chủ Dòng Lệnh CLI</div>
      <p class="card-desc">Cheatsheet phím tắt Terminal siêu tốc, quản lý tiến trình nền (process), kiểm tra Port mạng, gọi cURL API và tạo mã QR.</p>
      <div class="card-footer">Đọc bài viết <span class="arrow">→</span></div>
    </a>
  </div>
</div>

<div class="carousel-section vp-doc">
  <div class="section-header">
    <h2 class="section-title">✨ Dự Án & Công Nghệ Thực Chiến</h2>
    <p class="section-subtitle">Khám phá các sản phẩm hoàn chỉnh và bộ công cụ tối ưu hiệu năng cao cấp.</p>
  </div>
  <div class="carousel-container">
    <div class="carousel-track" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="slide.id" class="carousel-slide">
        <div class="slide-content">
          <div class="slide-image-wrapper">
            <img :src="slide.image" :alt="slide.title" class="slide-image" />
          </div>
          <div class="slide-info">
            <h3 class="slide-title">{{ slide.title }}</h3>
            <p class="slide-desc">{{ slide.desc }}</p>
            <div class="slide-badge">Thực tế sản phẩm</div>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-arrow prev" @click="prevSlide">‹</button>
    <button class="carousel-arrow next" @click="nextSlide">›</button>
    <div class="carousel-indicators">
      <span v-for="(slide, index) in slides" :key="slide.id" class="indicator-dot" :class="{ active: index === activeIndex }" @click="setSlide(index)"></span>
    </div>
  </div>
</div>

<div class="highlight-section vp-doc">
  <div class="section-header">
    <h2 class="section-title">⚡ Thế Mạnh Kỹ Thuật Nổi Bật</h2>
    <p class="section-subtitle">Những giá trị cốt lõi mang lại sự khác biệt và hiệu năng vượt trội trong mỗi dự án.</p>
  </div>
  <div class="highlight-grid">
    <div class="highlight-card">
      <div class="hl-icon">🏅</div>
      <h3 class="hl-title">5+ Năm Thực Chiến</h3>
      <p class="hl-desc">Kinh nghiệm phát triển sâu rộng các ứng dụng React Native từ startup đến doanh nghiệp quy mô lớn.</p>
    </div>
    <div class="highlight-card">
      <div class="hl-icon">🚀</div>
      <h3 class="hl-title">20+ Store Apps</h3>
      <p class="hl-desc">Phát hành thành công hàng chục ứng dụng mượt mà trên App Store và Google Play Store.</p>
    </div>
    <div class="highlight-card">
      <div class="hl-icon">💎</div>
      <h3 class="hl-title">100% Clean Code</h3>
      <p class="hl-desc">Mã nguồn sạch, dễ bảo trì, áp dụng chuẩn SOLID và tư duy tối ưu hóa hiệu suất bộ nhớ.</p>
    </div>
    <div class="highlight-card">
      <div class="hl-icon">🎯</div>
      <h3 class="hl-title">Công Nghệ Hiện Đại</h3>
      <p class="hl-desc">Liên tục cập nhật và làm chủ các kỹ thuật tiên tiến: Expo Prebuild, Turbomodules, và custom JSI.</p>
    </div>
  </div>
</div>

<div class="qa-section vp-doc">
  <div class="section-header">
    <h2 class="section-title">💬 Giải Đáp Thực Chiến</h2>
    <p class="section-subtitle">Những thắc mắc thường gặp về lập trình di động, tối ưu hiệu năng và quy chuẩn mã nguồn sạch.</p>
  </div>
  <div class="qa-container">
    <details class="qa-item">
      <summary class="qa-summary">
        <span>💡 Làm thế nào để tối ưu danh sách cuộn siêu dài trong React Native?</span>
        <span class="qa-arrow"></span>
      </summary>
      <div class="qa-content">
        <p>Để tối ưu danh sách siêu dài, bạn nên chuyển từ <code>FlatList</code> mặc định sang <code>FlashList</code> của Shopify. FlashList hoạt động theo mô hình tái sử dụng cell (Recycle cells) tương tự Native iOS/Android giúp tiết kiệm tới 80% RAM, triệt tiêu hoàn toàn hiện tượng nhấp nháy hoặc màn hình trắng khi cuộn nhanh.</p>
      </div>
    </details>
    <details class="qa-item">
      <summary class="qa-summary">
        <span>💡 Khi nào nên tự host OTA Hot Updater thay vì dùng CodePush/App Store?</span>
        <span class="qa-arrow"></span>
      </summary>
      <div class="qa-content">
        <p>Khi bạn cần toàn quyền kiểm soát hạ tầng máy chủ cập nhật (bảo mật cao), tối ưu chi phí truyền tải bundle JavaScript, hoặc muốn phân phối bundle cực kỳ nhanh qua CDN riêng như Cloudflare R2 / AWS S3 kết hợp Lambda@Edge mà không phụ thuộc vào giới hạn băng thông hay chính sách của bên thứ ba.</p>
      </div>
    </details>
    <details class="qa-item">
      <summary class="qa-summary">
        <span>💡 Nguyên lý cốt lõi để duy trì Code Sạch (Clean Code) trong React Native là gì?</span>
        <span class="qa-arrow"></span>
      </summary>
      <div class="qa-content">
        <p>Nguyên lý quan trọng nhất là <strong>Tách biệt mối quan tâm (Separation of Concerns)</strong>: Logic xử lý trạng thái tách rời UI (sử dụng custom hooks), triệt tiêu các điều kiện lồng nhau bằng cách viết <strong>Early Return (Guard Clauses)</strong>, viết các hàm thuần khiết (Pure Functions), và đặt tên biến/hàm mang tính tự giải thích rõ ràng.</p>
      </div>
    </details>
  </div>
</div>

<footer class="custom-footer">
  <div class="footer-content">
    <div class="footer-brand">
      <span class="footer-logo">Dũng Nguyễn</span>
      <p class="footer-desc">Chia sẻ kinh nghiệm thực chiến lập trình React Native, tối ưu hiệu năng chuyên sâu và nghệ thuật viết Code Sạch.</p>
      <div class="footer-socials">
        <a href="https://github.com/DungTriNguyen" target="_blank" class="social-link github">GitHub</a>
        <a href="mailto:dungtringuyen.dev@gmail.com" class="social-link email">Email</a>
      </div>
    </div>
    <div class="footer-links">
      <div class="link-group">
        <span class="group-title">Chủ Đề</span>
        <a href="/react-native-with-firebase-fcm" class="f-link">React Native</a>
        <a href="/instrument-performance" class="f-link">Tối Ưu RAM</a>
        <a href="/clean-code" class="f-link">Clean Code</a>
      </div>
      <div class="link-group">
        <span class="group-title">Tài Nguyên</span>
        <a href="https://github.com/DungTriNguyen/vite-press-blogs" target="_blank" class="f-link">Mã nguồn blog</a>
        <a href="/learn-code-terminal" class="f-link">Lệnh CLI Terminal</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Dũng Nguyễn Blog • Bản quyền nội dung thuộc về tác giả. Thiết kế chuyên nghiệp bởi Antigravity UI.</p>
  </div>
</footer>

<style>
/* Smooth scroll behavior */
html, body {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.blog-grid-container {
  max-width: 1152px;
  margin: 40px auto 80px auto;
  padding: 0 24px;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.section-subtitle {
  font-size: 17px;
  font-weight: 600;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
  background: linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #fb7185 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: block;
  text-align: center;
  padding: 0 16px;
  letter-spacing: 0.01em;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Custom Hero Wrapper */
.custom-hero-wrapper {
  position: relative;
  width: 100%;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 100px 24px 80px 24px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

/* Ambient glow blobs in background */
.glow-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12;
  z-index: 1;
  pointer-events: none;
}

.blob-1 {
  width: 350px;
  height: 350px;
  background: var(--vp-c-brand-1);
  top: -50px;
  left: 15%;
  animation: float-blob-1 20s infinite alternate ease-in-out;
}

.blob-2 {
  width: 400px;
  height: 400px;
  background: #a855f7;
  bottom: 0px;
  right: 10%;
  animation: float-blob-2 25s infinite alternate ease-in-out;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: #fb7185;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-blob-3 18s infinite alternate ease-in-out;
}

@keyframes float-blob-1 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, 30px) scale(1.1); }
}

@keyframes float-blob-2 {
  0% { transform: translate(0, 0) scale(1.1); }
  100% { transform: translate(-50px, -20px) scale(0.9); }
}

@keyframes float-blob-3 {
  0% { transform: translate(-50%, -50%) scale(0.9); }
  100% { transform: translate(-30%, -40%) scale(1.1); }
}

.custom-hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Badge style */
.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  padding: 6px 18px;
  margin-bottom: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dark .hero-badge {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

html:not(.dark) .hero-badge {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.hero-badge span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  background: linear-gradient(90deg, #38bdf8, #c084fc, #fb7185);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Title style */
.hero-title {
  display: flex;
  flex-direction: column;
  line-height: 3.5;
  margin-bottom: 24px;
}

.title-name {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.title-sub {
  font-size: 58px;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #38bdf8, #c084fc, #fb7185, #38bdf8);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: animated-gradient-text 8s linear infinite;
  margin-top: 4px;
}

@keyframes animated-gradient-text {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

/* Tagline style */
.hero-tagline {
  font-size: 19px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  max-width: 620px;
  margin: 0 auto 36px auto;
  font-weight: 500;
}

/* Actions styling */
.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 99px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* Primary Button (Khám phá) */
.btn-primary {
  background: linear-gradient(135deg, #38bdf8 0%, #c084fc 100%);
  color: #ffffff !important;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.25);
  border: none;
}

.btn-primary::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c084fc 0%, #fb7185 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.btn-primary span {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(192, 132, 252, 0.45);
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary:active {
  transform: translateY(-1px);
}

/* Secondary Button (Clean Code) */
.btn-secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-1) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dark .btn-secondary {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

html:not(.dark) .btn-secondary {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.08);
  color: var(--vp-c-text-1) !important;
}

.btn-secondary::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 99px;
  padding: 1.5px;
  background: linear-gradient(135deg, #38bdf8, #c084fc);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.btn-secondary span {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.06);
}

html:not(.dark) .btn-secondary:hover {
  background: rgba(0, 0, 0, 0.04);
}

.btn-secondary:hover::before {
  opacity: 1;
}

.btn-secondary:active {
  transform: translateY(-1px);
}

/* Responsive Custom Hero */
@media (max-width: 768px) {
  .title-name {
    font-size: 48px;
  }
  .title-sub {
    font-size: 44px;
  }
  .hero-tagline {
    font-size: 16px;
  }
  .custom-hero-wrapper {
    padding: 60px 16px 40px 16px;
    min-height: 440px;
  }
}

/* Premium Blog Card Base */
.blog-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 28px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dark .blog-card {
  background-color: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.05);
}

html:not(.dark) .blog-card {
  background-color: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.blog-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 18px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.blog-card:hover {
  transform: translateY(-6px);
}

.blog-card:hover::after {
  opacity: 0.06;
}

/* React Native Card Hover Glow */
.card-rn:hover {
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.15);
}
.card-rn::after {
  background: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.5), transparent 70%);
}

/* RAM/Perf Card Hover Glow */
.card-perf:hover {
  border-color: rgba(251, 113, 133, 0.4);
  box-shadow: 0 12px 30px rgba(251, 113, 133, 0.15);
}
.card-perf::after {
  background: radial-gradient(circle at 50% 0%, rgba(251, 113, 133, 0.5), transparent 70%);
}

/* Clean Code Card Hover Glow */
.card-clean:hover {
  border-color: rgba(74, 222, 128, 0.4);
  box-shadow: 0 12px 30px rgba(74, 222, 128, 0.15);
}
.card-clean::after {
  background: radial-gradient(circle at 50% 0%, rgba(74, 222, 128, 0.5), transparent 70%);
}

/* Terminal Card Hover Glow */
.card-terminal:hover {
  border-color: rgba(192, 132, 252, 0.4);
  box-shadow: 0 12px 30px rgba(192, 132, 252, 0.15);
}
.card-terminal::after {
  background: radial-gradient(circle at 50% 0%, rgba(192, 132, 252, 0.5), transparent 70%);
}

.card-tag {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 99px;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
  font-family: var(--vp-font-family-mono);
}

.tag-rn {
  background-color: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.tag-perf {
  background-color: rgba(244, 63, 94, 0.12);
  color: #fb7185;
  border: 1px solid rgba(244, 63, 94, 0.2);
}

.tag-clean {
  background-color: rgba(34, 197, 94, 0.12);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.tag-terminal {
  background-color: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

/* Light mode overrides for tag badges */
html:not(.dark) .tag-rn {
  color: #0369a1;
  background-color: #f0f9ff;
  border-color: #bae6fd;
}
html:not(.dark) .tag-perf {
  color: #be123c;
  background-color: #fff1f2;
  border-color: #fecdd3;
}
html:not(.dark) .tag-clean {
  color: #15803d;
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}
html:not(.dark) .tag-terminal {
  color: #6b21a8;
  background-color: #faf5ff;
  border-color: #e9d5ff;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 12px 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
  transition: color 0.25s ease;
}

.blog-card:hover .card-title {
  color: var(--vp-c-brand-1);
}

.card-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 24px 0;
  flex-grow: 1;
}

.card-footer {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
}

.card-footer .arrow {
  transition: transform 0.25s ease;
}

.blog-card:hover .card-footer .arrow {
  transform: translateX(6px);
}

/* Carousel Section Styling */
.carousel-section {
  max-width: 1152px;
  margin: 80px auto;
  padding: 0 24px;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.dark .carousel-container {
  background: rgba(255, 255, 255, 0.01);
  border-color: rgba(255, 255, 255, 0.06);
}

html:not(.dark) .carousel-container {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  width: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  box-sizing: border-box;
}

.slide-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 36px;
  padding: 40px;
}

@media (max-width: 768px) {
  .slide-content {
    flex-direction: column;
    padding: 24px;
    gap: 20px;
  }
}

.slide-image-wrapper {
  flex: 1.2;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
}

html:not(.dark) .slide-image-wrapper {
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}

.slide-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.carousel-slide:hover .slide-image {
  transform: scale(1.03);
}

.slide-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.slide-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 12px 0;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.slide-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.slide-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 99px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(192, 132, 252, 0.1) 100%);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
  letter-spacing: 0.05em;
}

/* Arrows */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-1);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  line-height: 1;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.carousel-arrow:hover {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
}

.carousel-arrow.prev {
  left: 12px;
}

.carousel-arrow.next {
  right: 12px;
}

@media (max-width: 500px) {
  .carousel-arrow {
    display: none;
  }
}

/* Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark .indicator-dot {
  background: rgba(255, 255, 255, 0.2);
}

html:not(.dark) .indicator-dot {
  background: rgba(0, 0, 0, 0.15);
}

.indicator-dot.active {
  width: 24px;
  border-radius: 4px;
  background: var(--vp-c-brand-1);
}

/* Highlight Section Styling */
.highlight-section {
  max-width: 1152px;
  margin: 80px auto;
  padding: 0 24px;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 992px) {
  .highlight-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .highlight-grid {
    grid-template-columns: 1fr;
  }
}

.highlight-card {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dark .highlight-card {
  background: rgba(255, 255, 255, 0.01);
  border-color: rgba(255, 255, 255, 0.05);
}

html:not(.dark) .highlight-card {
  background: rgba(255, 255, 255, 0.75);
  border-color: rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.highlight-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 15px 30px rgba(56, 189, 248, 0.1);
}

.hl-icon {
  font-size: 36px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
  display: inline-block;
  animation: float-icon 4s infinite alternate ease-in-out;
}

@keyframes float-icon {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}

.hl-title {
  font-size: 19px;
  font-weight: 800;
  margin: 0 0 10px 0;
  color: var(--vp-c-text-1);
}

.hl-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

/* QA Section Styling */
.qa-section {
  max-width: 800px;
  margin: 80px auto;
  padding: 0 24px;
}

.qa-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.qa-item {
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.01);
  overflow: hidden;
  transition: all 0.3s ease;
}

.dark .qa-item {
  background: rgba(255, 255, 255, 0.01);
  border-color: rgba(255, 255, 255, 0.05);
}

html:not(.dark) .qa-item {
  background: rgba(255, 255, 255, 0.65);
  border-color: rgba(0, 0, 0, 0.06);
}

.qa-item[open] {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 20px rgba(56, 189, 248, 0.05);
}

.qa-summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.qa-summary::-webkit-details-marker {
  display: none;
}

.qa-summary:hover {
  color: var(--vp-c-brand-1);
}

.qa-arrow {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.qa-arrow::before,
.qa-arrow::after {
  content: "";
  position: absolute;
  background: currentColor;
  border-radius: 2px;
}

.qa-arrow::before {
  width: 12px;
  height: 2px;
}

.qa-arrow::after {
  width: 2px;
  height: 12px;
  transition: transform 0.3s ease;
}

.qa-item[open] .qa-arrow {
  transform: rotate(45deg);
  color: var(--vp-c-brand-1);
}

.qa-item[open] .qa-arrow::after {
  transform: rotate(90deg);
}

.qa-content {
  padding: 0 24px 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

html:not(.dark) .qa-content {
  border-top-color: rgba(0, 0, 0, 0.03);
}

.qa-content p {
  margin: 0;
}

/* Custom Creative Footer */
.custom-footer {
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
  margin-top: 120px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.2);
  padding: 64px 24px 32px 24px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-sizing: border-box;
}

.dark .custom-footer {
  background: rgba(0, 0, 0, 0.25);
  border-top-color: rgba(255, 255, 255, 0.06);
}

html:not(.dark) .custom-footer {
  background: rgba(0, 0, 0, 0.02);
  border-top-color: rgba(0, 0, 0, 0.06);
}

.footer-content {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 48px;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 36px;
  }
}

.footer-brand {
  flex: 1.5;
  max-width: 480px;
}

.footer-logo {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #38bdf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  margin-bottom: 16px;
}

.footer-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.footer-socials {
  display: flex;
  gap: 16px;
}

.social-link {
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none !important;
  color: var(--vp-c-text-2) !important;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.social-link:hover {
  color: var(--vp-c-brand-1) !important;
}

.footer-links {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 32px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-title {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.f-link {
  font-size: 14px;
  color: var(--vp-c-text-2) !important;
  text-decoration: none !important;
  transition: all 0.25s ease;
}

.f-link:hover {
  color: var(--vp-c-brand-1) !important;
  transform: translateX(4px);
}

.footer-bottom {
  max-width: 1152px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 24px;
  text-align: center;
}

html:not(.dark) .footer-bottom {
  border-top-color: rgba(0, 0, 0, 0.04);
}

.footer-bottom p {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
}
</style>

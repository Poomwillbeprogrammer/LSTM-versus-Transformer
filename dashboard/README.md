# LSTM vs BERT Sentiment Analysis Interactive Dashboard

ระบบแดชบอร์ดจำลองและแสดงผลการเปรียบเทียบเชิงประจักษ์ระหว่างโครงข่ายประสาทแบบจดจำระยะสั้นยาว (LSTM) และแบบจำลองภาษาเบิร์ต (BERT) บนงานจำแนกความรู้สึก (Sentiment Analysis) ชุดข้อมูล IMDb 500 ตัวอย่าง

---

## 🎓 ข้อมูลรายวิชาและผู้วิจัย
* **รายวิชา**: ENGCE 408 Introduction to Pattern Recognition (การรู้จำรูปแบบ)
* **อาจารย์ผู้สอน**: ผู้ช่วยศาสตราจารย์ ดร.สมนึก สุระธง
* **ผู้จัดทำ**: นายชยุตม์ อยู่เจริญกิจ (รหัสนักศึกษา 67543206046-4)
* **สถาบัน**: สาขาวิศวกรรมไฟฟ้า (วิศวกรรมคอมพิวเตอร์) คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่ (RMUTL)
* **ภาคการศึกษา**: ภาคเรียนที่ 1 ปีการศึกษา 2569

---

## 🚀 วิธีการเปิดใช้งาน

### วิธีที่ 1: เปิดใช้งานทันที (Zero-Install Standalone)
ดับเบิลคลิกไฟล์ **`Sentiment_Analysis_Dashboard.html`** ที่อยู่ในโฟลเดอร์หลัก `Term Project/` เพื่อเปิดบนเว็บเบราว์เซอร์ (Chrome, Edge, Firefox, Safari) ได้ทันที โดยทำงานแบบ **Offline 100%** ไม่ต้องเชื่อมต่ออินเทอร์เน็ตและไม่ต้องติดตั้ง Node.js

### วิธีที่ 2: รันโหมด Development ด้วย Node.js
```bash
cd "C:\Users\poomw\Documents\somnuek\Term Project\dashboard"
npm run dev
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

### วิธีที่ 3: Build ไฟล์ใหม่
```bash
npm run build
```
ระบบจะคอมไพล์โค้ดทั้งหมด (React + Tailwind + Recharts + ชุดข้อมูล 500 ตัวอย่าง) ออกมาเป็นไฟล์ `dist/index.html` ไฟล์เดียวจบ

---

## 📑 โครงสร้าง 5 แท็บหลักในแดชบอร์ด

1. **ภาพรวม & ทฤษฎี (Overview & Theory)**:
   * บทนำและที่มาของปัญหา (Long-term Dependency & Sequential Bottleneck)
   * การเปรียบเทียบกระบวนทัศน์ดั้งเดิม (LSTM) กับกระบวนทัศน์ใหม่ (Transformer BERT)
   * แผนภาพกระบวนการวิศวกรรม 5 ขั้นตอน (End-to-End Pipeline)

2. **ผลการทดลองเชิงประจักษ์ (Empirical Benchmark)**:
   * ตารางที่ 2 และกราฟเปรียบเทียบ 4 ตัวชี้วัด: Accuracy (85.60% vs 55.20%), Precision, Recall, F1
   * กราฟเส้นการลู่เข้าของ Loss (Loss Convergence Trajectory) พร้อมการวิเคราะห์ภาวะ Overfitting ของ LSTM vs Transfer Learning ของ BERT
   * เมทริกซ์ความสับสน (Confusion Matrices) ทั้งสองโมเดล
   * การวิเคราะห์ความคุ้มค่าเชิงวิศวกรรม (Engineering Trade-Off 51x)

3. **จำลองสถาปัตยกรรม & Attention (Architecture & Attention Simulator)**:
   * จำลองสายพานการอ่านทีละคำของ LSTM พร้อมเกจวัดระดับสัญญาณความจำที่เลือนหาย (Context Decay)
   * จำลอง Multi-Head Self-Attention Matrix ของ BERT ที่สามารถคลิกดูคู่คำเชื่อมโยงแบบสองทิศทางได้แบบไดนามิก

4. **สำรวจชุดข้อมูล 500 ตัวอย่าง (500 Test Dataset Explorer)**:
   * ตารางค้นหาและฟิลเตอร์รีวิวจริง 500 ตัวอย่าง (Positive 246 / Negative 254)
   * ตัวกรองอัจฉริยะ: *BERT Wins (162 เคส)*, *LSTM Wins*, *ทายถูกทั้งคู่*, *ทายผิดทั้งคู่*, *ข้อความยาว*, *คำปฏิเสธ (Negation)*
   * กล่องเจาะลึกการวิเคราะห์ความผิดพลาดรายข้อความ (Sample Detail Inspector)
   * ปุ่มดาวน์โหลดไฟล์ผลลัพธ์เป็น CSV

5. **Live Playground**:
   * พื้นที่พิมพ์ข้อความทดสอบสดเพื่อเปรียบเทียบการตัดสินใจของ LSTM vs BERT แบบ 60 FPS
   * แผนภาพ Token Saliency & Lexicon Breakdown เน้นคำเชิงบวก/ลบ/ปฏิเสธ

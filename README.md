# LSTM vs. Transformer (BERT) Sentiment Analysis Visual Lab

<p align="center">
  <img src="https://img.shields.io/badge/Course-ENGCE%20408%20Pattern%20Recognition-c58a2e?style=for-the-badge&logo=googlescholar&logoColor=white" alt="Course Badge" />
  <img src="https://img.shields.io/badge/Institution-RMUTL%20Chiang%20Mai-d99f3d?style=for-the-badge" alt="Institution Badge" />
  <img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10b981?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo Badge" />
  <img src="https://img.shields.io/badge/Stack-React%2019%20%7C%20Vite%208%20%7C%20Tailwind%20v4-8d5c1a?style=for-the-badge" alt="Stack Badge" />
</p>

---

## 🌐 Live Interactive Demonstration

> 🚀 **เปิดใช้งานเว็บแอปพลิเคชันออนไลน์:**  
> 👉 [https://poomwillbeprogrammer.github.io/LSTM-versus-Transformer/](https://poomwillbeprogrammer.github.io/LSTM-versus-Transformer/)

*(หรือดับเบิลคลิกเปิดไฟล์ [`Sentiment_Analysis_Dashboard.html`](./Sentiment_Analysis_Dashboard.html) ในเครื่องของคุณเพื่อใช้งานแบบออฟไลน์ 100% โดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต)*

---

## 🎓 ข้อมูลโครงงานทางวิชาการ (Academic Identification)

| ข้อมูล | รายละเอียด |
| :--- | :--- |
| **ชื่อโครงงาน** | การเปรียบเทียบเชิงประจักษ์ระหว่างโครงข่ายประสาทแบบวนซ้ำ (LSTM) กับแบบจำลองภาษาทรานส์ฟอร์เมอร์ (BERT) ในการจำแนกความรู้สึกบนชุดข้อมูล IMDb |
| **Project Title** | *Empirical Comparison of Recurrent Neural Networks (LSTM) vs. Transformer (BERT) for Sentiment Analysis on IMDb Dataset* |
| **รายวิชา** | **ENGCE 408 การรู้จำรูปแบบ (Introduction to Pattern Recognition)** |
| **อาจารย์ผู้สอน** | **ผู้ช่วยศาสตราจารย์ ดร.สมนึก สุระธง** (Asst. Prof. Dr. Somnuek Suratong) |
| **ผู้จัดทำ** | **นายชยุตม์ อยู่เจริญกิจ** (Chayut Yucharernkit) — รหัสนักศึกษา `67543206046-4` |
| **สาขาวิชา** | วิศวกรรมคอมพิวเตอร์และสารสนเทศ สาขาวิศวกรรมไฟฟ้า คณะวิศวกรรมศาสตร์ |
| **สถาบัน** | มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่ (RMUTL) |
| **ปีการศึกษา** | ภาคการศึกษาที่ 2 ปีการศึกษา 2568 (2026) |

---

## 📌 บทคัดย่อและการเปลี่ยนผ่านของกระบวนทัศน์ (Executive Summary & Paradigm Shift)

โครงงานนี้จัดทำขึ้นเพื่อพิสูจน์เชิงประจักษ์ถึง **การเปลี่ยนผ่านของกระบวนทัศน์ (Paradigm Shift)** ในสาขาวิชาการรู้จำรูปแบบและการประมวลผลภาษาธรรมชาติ (NLP) โดยทำการทดลองเปรียบเทียบระหว่าง:

1. **สถาปัตยกรรมดั้งเดิม (Old Paradigm): Long Short-Term Memory (LSTM)**  
   ใช้การอ่านข้อมูลทีละขั้นตามลำดับเวลา (Sequential Step-by-Step Recurrence) และฝึกสอนจากศูนย์ (Train from scratch) บนข้อมูล 2,000 ตัวอย่าง
2. **สถาปัตยกรรมสมัยใหม่ (New Paradigm): Bidirectional Encoder Representations from Transformers (BERT)**  
   ใช้กลไกความใส่ใจตนเองแบบหลายหัว (Multi-Head Self-Attention) ควบคู่กับพลังของการถ่ายโอนการเรียนรู้ (Transfer Learning) จาก Pre-trained weights บนคลังข้อความขนาด 3,300 ล้านคำ

---

## 📊 ผลการทดสอบประสิทธิภาพเชิงปริมาณ (Empirical Benchmark Results)

> 📍 *ข้อมูลจากการทดลองจริง ตารางที่ 2 ในรายงานวิจัย ทดสอบบนชุดทดสอบมาตรฐาน IMDb 500 ตัวอย่าง (Positive 246 / Negative 254, Random Seed = 42)*

| ตัวชี้วัดประสิทธิภาพ (Metrics) | LSTM (Baseline) | BERT (Fine-tuning) | ผลต่างการปรับปรุง (Δ Gain) | ความหมายเชิงวิศวกรรม |
| :--- | :---: | :---: | :---: | :--- |
| **ความถูกต้อง (Accuracy)** | `55.20%` (276/500) | **`85.60%`** (428/500) | **`+30.40%`** | BERT จำแนกถูกต้องเหนือกว่าชัดเจน |
| **ความแม่นยำ (Precision)** | `54.44%` | **`83.72%`** | **`+29.28%`** | ลดข้อผิดพลาดการทายบวกพร่ำเพรื่อ |
| **ความครอบคลุม (Recall)** | `54.88%` | **`87.80%`** | **`+32.92%`** | ดักจับความคิดเห็นเชิงบวกได้ครอบคลุม |
| **ค่าคะแนนเอฟวัน (F1-Score)** | `54.66%` | **`85.71%`** | **`+31.06%`** | บ่งชี้ความสมดุลสูงสุดในทุกสภาวะ |
| **Training Loss สุดท้าย** | `0.3234` (5 Epochs) | **`0.1369`** (3 Epochs) | **`-57.7%`** | ลู่เข้าเร็วกว่าและมีเสถียรภาพสูง |
| **เวลาฝึกเฉลี่ยต่อรอบ (Time/Epoch)** | **`0.82 วินาที`** | `42.07 วินาที` | `51.3× นานกว่า` | ต้นทุนการคำนวณที่ต้องแลกมา |
| **ขนาดพารามิเตอร์ (Model Parameters)** | **`4.04 ล้าน`** | `110.0 ล้าน` | `27.2× ใหญ่กว่า` | ขนาดหน่วยความจำที่โมเดลต้องการ |

### 💡 ข้อค้นพบสำคัญ (Key Empirical Insight)
- **Overfitting ของ LSTM:** ค่า Loss ของ LSTM ลดลงจาก `0.6976` สู่ `0.3234` (ลดลง 53.6%) แต่ความถูกต้องบนชุดทดสอบทำได้เพียง **55.20%** ซึ่งสูงกว่าการเดาสุ่ม (`50.00%`) เพียงเล็กน้อย สะท้อนว่าโมเดลเกิด Overfitting บนชุดข้อมูลฝึกขนาดเล็ก (2,000 ตัวอย่าง) และไม่สามารถสรุปความหมายทั่วไปของคำศัพท์ 30,522 คำได้
- **พลังของ Pre-training ใน BERT:** BERT Fine-tune เพียง 3 รอบ โดยใช้โมเดลรากฐานที่เรียนรู้ภาษาอังกฤษมาอย่างลึกซึ้งแล้ว ทำให้ได้ความแม่นยำก้าวกระโดดถึง **85.60%** โดยไม่ต้องกังวลเรื่องการขาดแคลนข้อมูล

---

## 🔬 การวิเคราะห์เชิงสถาปัตยกรรม (Architectural Diagnosis)

```
[กระบวนทัศน์เดิม: LSTM]
x_1 ----> x_2 ----> x_3 ----> ... ----> x_n (คอขวดลำดับเวลา t-1 & สัญญาณเจือจาง)
  └── Forget Gate: C_t = f_t ⊙ C_(t-1) + i_t ⊙ C̃_t

[กระบวนทัศน์ใหม่: BERT Multi-Head Self-Attention]
  x_1 <==========> x_2 <==========> x_3 <==========> x_n (Path Length = 1 ทุกคู่คำ)
  └── Softmax Scaling: Attention(Q, K, V) = softmax( (Q × K^T) / √d_k ) × V
```

1. **ปัญหา Context Decay ใน LSTM:** สัญญาณสารสนเทศของคำต้นประโยคจะลดลงเรื่อย ๆ ตามระยะทาง ($O(N)$ Path Length) เมื่อเจอประโยคยาวที่มีการหักมุม เช่น *"The movie was not bad, but the ending was barely watchable."* โมเดลจะลืมคู่คำเชื่อมโยงสำคัญ
2. **การเชื่อมต่อสองทิศทางของ BERT:** ทุกคู่คำคำนวณความสัมพันธ์ถึงกันโดยตรงแบบคู่ขนานบน GPU Tensor Cores ทำให้คำปฏิเสธ (*not*, *barely*) ถูกจับคู่กับคำเป้าหมายได้อย่างแม่นยำไร้คอขวด

---

## 🖥️ คุณสมบัติเด่นของ Interactive Dashboard

ระบบแดชบอร์ดถูกออกแบบตามมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล แบ่งออกเป็น 5 มดูลหลัก:

1. **📊 Overview (ภาพรวมและกระบวนทัศน์):**
   - ตัวชี้วัดสรุปผล (Hero Metric Dials) แสดงส่วนต่างความถูกต้อง +30.40%
   - คำถามการวิจัยหลัก และการเปรียบเทียบเชิงโครงสร้างสถาปัตยกรรม
2. **📈 Benchmark (ผลการทดสอบเชิงลึก):**
   - แผนภูมิแท่งเปรียบเทียบ (Interactive Bar Chart) และแผนภูมิเรดาร์ (Radar Chart)
   - กราฟเส้นการลู่เข้าของความสูญเสีย (Loss Convergence Progression)
   - เมทริกซ์ความสับสนเคียงข้างกัน (Side-by-side Confusion Matrices: TP, TN, FP, FN)
   - แผนผังวิเคราะห์ต้นทุนเชิงวิศวกรรม (Engineering Trade-off: Time vs. Accuracy)
3. **🧠 Architecture Simulator (จำลองกลไกการทำงาน):**
   - สายพานลำดับคำ LSTM พร้อมมิเตอร์วัดระดับการเจือจางความจำ (Signal Retention Meter)
   - เครื่องมือส่องดู Attention Weight Matrix ของ BERT แบบระบุคำ Query
4. **🔍 Dataset Explorer (สำรวจข้อมูล 500 ตัวอย่างจริง):**
   - สำรวจรีวิวจริงทั้ง 500 ตัวอย่าง พร้อมป้ายกำกับ Actual Label, LSTM Pred, BERT Pred
   - ตัวกรองอัจฉริยะ: *BERT ชนะ (LSTM ผิด)*, *LSTM ชนะ*, *ทายถูกทั้งคู่*, *ทายผิดทั้งคู่*, *มีคำปฏิเสธ*
   - หน้าต่างเจาะลึกการวิเคราะห์สาเหตุความผิดพลาดรายข้อความ (Root Cause Analysis Drawer)
   - ปุ่มส่งออกข้อมูล CSV สำหรับนำไปวิเคราะห์ต่อในโปรแกรมสถิติ
5. **⚡ Real-time Playground (สนามทดลองวิเคราะห์ความรู้สึก):**
   - พิมพ์ข้อความภาษาอังกฤษใดๆ เพื่อดูการตอบสนองของโมเดลทั้งสองแบบสด ๆ
   - แถบความน่าจะเป็นเชิงบวก (Positive Probability Meter)
   - แผนผังจำแนกคำสำคัญ (Token Saliency & Lexicon Heatmap)

---

## 🎨 ระบบอัตลักษณ์งานออกแบบ (RMUTL Golden Brown Design System)

แดชบอร์ดนี้ใช้อัตลักษณ์ **สีน้ำตาลทอง มทร.ล้านนา (RMUTL Golden Brown)** ตามข้อกำหนดของสถาบัน เพื่อให้เกียรติแก่มหาวิทยาลัยและแสดงความพร้อมในการนำเสนอระดับมืออาชีพ:

- **Primary Accent:** `#c58a2e` (RMUTL Golden Brown), Hover `#d99f3d`, Light `#f0c674`
- **Secondary Baseline:** `#d97706` (Recurrent Amber Bronze สำหรับ LSTM)
- **Backgrounds:** `#0c0a08` (Warm Obsidian Void) และ `#16120e` (Rich Espresso Surface)
- **Borders:** `#2e251b` / `#382f25` (Lanna Bronze 1px)
- **Mathematical Rigor:** ตัวเลขสถิติ ผลการทดสอบ และตัวแปรทางคณิตศาสตร์ทั้งหมดเรนเดอร์ด้วยฟอนต์ Monospace 100%

---

## 📂 โครงสร้างไฟล์ในโครงการ (Repository Structure)

```
Term Project/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD Workflow สำหรับ GitHub Pages อัตโนมัติ
├── .impeccable/
│   ├── config.json                 # การกำหนดค่า Impeccable Design System
│   └── design.json                 # โทเคนสีและค่าตัวแปร RMUTL Golden Brown
├── dashboard/
│   ├── src/
│   │   ├── components/             # คอมโพเนนต์หน้าเว็บ UI ทั้ง 5 แท็บ
│   │   │   ├── Header.jsx
│   │   │   ├── OverviewTab.jsx
│   │   │   ├── BenchmarkTab.jsx
│   │   │   ├── AttentionSimulatorTab.jsx
│   │   │   ├── DatasetExplorerTab.jsx
│   │   │   └── PlaygroundTab.jsx
│   │   ├── data/
│   │   │   ├── benchmarkData.js    # ข้อมูลสถิติเชิงปริมาณจากตารางที่ 1 และ 2
│   │   │   └── dataset_500.json    # คลังข้อมูล 500 ตัวอย่างจริงพร้อม RCA
│   │   ├── App.jsx
│   │   ├── index.css               # สไตล์ลิ่ง Tailwind CSS v4 ธีม มทร.ล้านนา
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # กำหนดค่า singlefile inline และ base: './'
├── docs/
│   └── index.html                  # ไฟล์ Single-file สำหรับ Host บน GitHub Pages
├── CONTEXT.md                      # อภิธานศัพท์และโมเดลโดเมนของงานวิจัย
├── DESIGN.md                       # เอกสารข้อกำหนดระบบการออกแบบ (Design Specification)
├── PRODUCT.md                      # วิสัยทัศน์ผลิตภัณฑ์และกลุ่มเป้าหมาย (Product Manifesto)
├── LLMล่าสุด.docx                  # รายงานวิจัยฉบับสมบูรณ์ (Term Paper)
├── LLM_Presentation.pptx           # สไลด์นำเสนอฉบับ PowerPoint
├── LLM_Presentation.pdf            # สไลด์นำเสนอฉบับ PDF
├── Sentiment_Analysis_Dashboard.html # ไฟล์ Standalone แดชบอร์ดพร้อมเปิดใช้งานออฟไลน์
└── README.md                       # เอกสารแนะนำโครงการฉบับสมบูรณ์
```

---

## 🚀 การติดตั้งและใช้งาน (Quickstart Guide)

### 1. การเรียกใช้งานแดชบอร์ดทันที (Offline Standalone)
ไม่ต้องติดตั้งโปรแกรมใดๆ เพียงดับเบิลคลิกไฟล์:
```bash
Sentiment_Analysis_Dashboard.html
```
บนคอมพิวเตอร์ของคุณ แดชบอร์ดจะทำงานได้ทันทีผ่าน Web Browser (Chrome, Edge, Firefox, Safari)

### 2. การรันในสภาพแวดล้อม Development
```bash
# 1. เข้าสู่โฟลเดอร์แดชบอร์ด
cd dashboard

# 2. ติดตั้ง Dependencies
npm install

# 3. เริ่มต้นรันเซิร์ฟเวอร์ทดสอบ
npm run dev
```

### 3. การสร้างไฟล์บันเดิล Production
```bash
cd dashboard
npm run build
```
ระบบจะคอมไพล์โค้ด HTML + CSS + JS ทั้งหมดให้รวมเป็นไฟล์เดียวใน `dashboard/dist/index.html`

---

## 📜 การอ้างอิงทางวิชาการ (References)

1. **Hochreiter, S., & Schmidhuber, J.** (1997). Long short-term memory. *Neural computation*, 9(8), 1735-1780.
2. **Vaswani, A., et al.** (2017). Attention is all you need. *Advances in Neural Information Processing Systems (NeurIPS 2017)*, 30.
3. **Devlin, J., Chang, M. W., Lee, K., & Toutanova, K.** (2018). BERT: Pre-training of deep bidirectional transformers for language understanding. *arXiv preprint arXiv:1810.04805*.
4. **Maas, A. L., et al.** (2011). Learning word vectors for sentiment analysis. *Proceedings of the 49th Annual Meeting of the Association for Computational Linguistics (ACL 2011)*, 142-150.

---

<p align="center">
  <b>วิชา ENGCE 408 การรู้จำรูปแบบ (Introduction to Pattern Recognition)</b><br />
  ภาควิชาวิศวกรรมไฟฟ้า (วิศวกรรมคอมพิวเตอร์) คณะวิศวกรรมศาสตร์<br />
  มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่
</p>

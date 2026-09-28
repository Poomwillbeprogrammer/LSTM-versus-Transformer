---
name: Sentiment Analysis Visual Lab
description: Modern AI research evaluation dashboard comparing LSTM and Transformer BERT architectures
colors:
  primary: "#4f46e5"
  primary-hover: "#6366f1"
  primary-light: "#818cf8"
  secondary-positive: "#10b981"
  secondary-positive-light: "#34d399"
  tertiary-baseline: "#f59e0b"
  tertiary-baseline-light: "#fbbf24"
  danger-negative: "#f43f5e"
  danger-negative-light: "#fb7185"
  neutral-bg-darkest: "#020617"
  neutral-surface: "#0f172a"
  neutral-surface-hover: "#1e293b"
  neutral-border: "#334155"
  neutral-border-subtle: "#1e293b"
  neutral-text-primary: "#f8fafc"
  neutral-text-secondary: "#cbd5e1"
  neutral-text-muted: "#94a3b8"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-text-primary}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-surface:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text-secondary}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  chip-badge:
    backgroundColor: "{colors.neutral-surface-hover}"
    textColor: "{colors.neutral-text-primary}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

# Design System: Sentiment Analysis Visual Lab

## Overview

**Creative North Star: "The Rigorous Machine Learning Observatory"**

ระบบงานออกแบบนี้สร้างขึ้นเพื่อสื่อสารข้อเท็จจริงทางวิทยาศาสตร์และการวิจัยคอมพิวเตอร์อย่างลึกซึ้ง (Rigorous Academic Grounding) มุ่งเน้นการให้ข้อมูลที่เฉียบคม ตรงไปตรงมา ปราศจากการตกแต่งที่รกรุงรัง โดยใช้บรรยากาศแบบห้องแล็บวิจัย AI ยุคใหม่ (Dark Mode AI Observatory) ที่ขับเน้นข้อมูลเชิงประจักษ์ กราฟสถิติ และการจำลองทางสถาปัตยกรรมให้เปล่งประกายและอ่านง่ายในทุกระดับสายตา

ระบบใช้พื้นหลังโทน Slate มืดสนิท (`#020617` และ `#0f172a`) เพื่อลดการล้าของสายตาในการนำเสนอสดผ่านโปรเจกเตอร์หรือหน้าจอแล็ปท็อป และใช้สีคู่ตรงข้ามที่มีความหมายเชิงความหมาย (Semantic Accents) เพื่อชี้นำสายตาไปยังสาระสำคัญ: สีคราม Indigo สำหรับตัวแทนของกระบวนทัศน์ใหม่ (Transformer BERT), สีส้มอำพัน Amber สำหรับตัวแทนของกระบวนทัศน์เดิม (LSTM Baseline), และสีเขียวมรกต Emerald สำหรับผลลัพธ์เชิงบวกและความถูกต้องของโมเดล

**Key Characteristics:**
- **High-Density Legibility**: จัดวางสถิติและตัวเลขขนาดใหญ่ด้วยฟอนต์ Monospace ควบคู่กับคำอธิบายภาษาไทยและอังกฤษที่กระชับ
- **Semantic Color Coding**: สีทุกสีมีหน้าที่เฉพาะเจาะจง ห้ามใช้สีพร่ำเพรื่อเพื่อความสวยงามเพียงอย่างเดียว
- **Tactile Diagnostic Micro-interactions**: การโต้ตอบที่ฉับไว เช่น การเลื่อนสเต็ปสายพาน LSTM, การส่องดู Attention Weight บนคำเฉพาะ, และฟิลเตอร์คลิกเดียวสำหรับขุดค้นข้อผิดพลาด

## Colors

ชุดสีถูกออกแบบตามหลักการ Semantic Color Assignment โดยทุกเฉดสีมีความหมายที่สอดคล้องกับตัวแปรในงานวิจัย

### Primary
- **Observatory Indigo** (`#4f46e5` / hover `#6366f1`): สีหลักของระบบ เป็นตัวแทนของสถาปัตยกรรมทรานส์ฟอร์เมอร์ (BERT) และการกระทำหลัก (Primary Navigation, Active Tabs, Action Buttons)

### Secondary
- **Empirical Emerald** (`#10b981` / light `#34d399`): ใช้แทนค่าความถูกต้อง (Correct Predictions), การทำนายเชิงบวก (Positive Sentiment), และการบรรลุเป้าหมายของโมเดล
- **Recurrent Amber** (`#f59e0b` / light `#fbbf24`): สีตัวแทนของโครงข่ายประสาท LSTM (Baseline), จุดที่ต้องเฝ้าระวัง, และคำเชื่อม/คำปฏิเสธในประโยค

### Tertiary
- **Fault Rose** (`#f43f5e` / light `#fb7185`): ใช้แทนความผิดพลาด (Incorrect Predictions), ข้อผิดพลาดในการจัดกลุ่ม, และความคิดเห็นเชิงลบ (Negative Sentiment)

### Neutral
- **Deep Void Background** (`#020617`): พื้นหลังระนาบหลักสุด
- **Lab Slate Surface** (`#0f172a`): พื้นผิวการ์ด คอนเทนเนอร์ และโมดูลหลัก
- **Hover/Elevated Surface** (`#1e293b`): ระนาบยกสูงและสถานะ Hover
- **Structural Border** (`#334155` / subtle `#1e293b`): เส้นขอบแบ่งเขตที่คมชัด
- **Pure Polar Text** (`#f8fafc`): ตัวอักษรหัวเรื่องและตัวเลขสำคัญ
- **Secondary Readable Text** (`#cbd5e1` / muted `#94a3b8`): ข้อความเนื้อหาและคำอธิบายเสริม

### Named Rules
**The Strict Semantic Color Rule.** ห้ามใช้สีเขียว Emerald หรือสีแดง Rose สำหรับตกแต่งทั่วไปเด็ดขาด สีเขียวสงวนไว้สำหรับความถูกต้อง/เชิงบวก และสีแดงสงวนไว้สำหรับความผิดพลาด/เชิงลบ เพื่อไม่ให้ผู้ตรวจสับสนข้อมูลสถิติ

## Typography

**Display & Body Font:** System UI Stacks (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif`)
**Data & Metric Font:** High-contrast Monospace (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** สะอาด ทันสมัย ให้ความรู้สึกแบบเอกสารวิชาการร่วมสมัยที่มีชีวิตชีวา อ่านภาษาไทยและศัพท์เทคนิคภาษาอังกฤษได้อย่างกลมกลืน

### Hierarchy
- **Display** (Bold 700, 24px - 32px, Line-height 1.25): ใช้เฉพาะชื่อหัวข้องานวิจัยและตัวเลขสรุปผลการทดลองหลัก (+30.40%)
- **Headline** (Bold 700, 18px - 20px, Line-height 1.3): ใช้สำหรับชื่อหมวดหมู่และชื่อแท็บในแต่ละหน้า
- **Title** (Semi-bold 600, 14px - 16px, Line-height 1.4): ใช้สำหรับหัวข้อการ์ดและป้ายกำกับโมเดล
- **Body** (Regular 400, 13px - 14px, Line-height 1.6, Max 75ch): คำอธิบายผลการทดลองและการวิเคราะห์เชิงลึก
- **Label / Metric Mono** (Semi-bold 600, 11px - 13px, Letter-spacing 0.05em): ใช้สำหรับตัวเลขเปอร์เซ็นต์, ค่าพารามิเตอร์, ตัวนับโทเคน, และสมการ

### Named Rules
**The Monospace Empirical Rule.** ตัวเลขวัดผลทุกตัว (Accuracy, Loss, Time, Tokens, ID) ต้องแสดงผลด้วยชุดฟอนต์ Monospace เสมอ เพื่อรักษาความตรงและเปรียบเทียบขนาดหลักทศนิยมได้แม่นยำ

## Layout

ระบบจัดวางแบบ Responsive Fluid Grid ขนาดกว้างสูงสุด 1280px (`max-w-7xl`) พร้อมขอบเขตขอบหน้าจอแบบปลอดภัย (Safe Padding 16px - 24px)
- **Top Navigation Anchor**: ส่วนหัววิชาและแท็บเมนูล็อคติดขอบบน (`sticky top-0 z-40`) พร้อมพื้นหลังเบลอ (`backdrop-blur-md`) เพื่อให้สลับแท็บได้ตลอดเวลา
- **Card Spacing Rhythm**: ใช้ระยะห่างแบบ 8-point Grid มาตรฐาน (`gap-4` ถึง `gap-8`) เพื่อสร้างสมดุลของช่องไฟ (Negative Space)
- **Side-by-Side Comparison Standard**: หน้าจอเปรียบเทียบ (Overview, Benchmarks, Architecture) จะแบ่งเป็น 2 คอลัมน์สมมาตร (50/50 Grid) เพื่อให้สายตาสามารถเปรียบเทียบซ้าย (LSTM) และขวา (BERT) ได้โดยไม่ต้องเลื่อนสายตากระโดด

## Elevation & Depth

ระบบใช้ปรัชญา **Tonal Layering with Crisp Borders** โดยไม่พึ่งพาเงาฟุ้งแบบซอฟต์เป็นหลัก แต่สร้างมิติผ่านความลึกของโทนสี (Darkest `#020617` $\rightarrow$ Surface `#0f172a` $\rightarrow$ Hover `#1e293b`) ควบคู่กับเส้นขอบบาง 1px (`border border-slate-800`)

### Shadow Vocabulary
- **Accent Glow** (`box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3)`): ใช้เฉพาะบนปุ่มหลักหรือแท็บที่กำลังเปิดใช้งาน เพื่อบ่งบอกสถานะ Active
- **Modal Elevation** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75)`): ใช้กับกล่อง Review Inspector Modal เพื่อตัดขาดจากระนาบพื้นหลัง

### Named Rules
**The Stroke-First Depth Rule.** พื้นผิวทุกชั้นต้องถูกกำหนดขอบเขตด้วยเส้นสโตรกสี Slate-800 ที่แน่นอน ห้ามปล่อยให้การ์ดลอยเคว้งโดยไม่มีเส้นกั้นขอบเขต

## Shapes

- **Corner Radii Hierarchy**:
  - `rounded-lg` (8px): ใช้สำหรับปุ่มกด, ช่องค้นหา, และแท็บเมนู
  - `rounded-xl` (12px): ใช้สำหรับการ์ดย่อย, กล่องโค้ด, และตารางข้อมูล
  - `rounded-2xl` (16px): ใช้สำหรับ Container ใหญ่ และ Modal ตรวจสอบ
  - `rounded-full` (9999px): ใช้สำหรับ Chip Status และแถบเปอร์เซ็นต์
- **Borders**: หนา 1px สม่ำเสมอ ไม่ใช้เส้นประหรือเส้นคู่ เพื่อความเรียบหรูเชิงวิชาการ

## Components

### Buttons
- **Primary Action (Active Tab / Export)**: พื้นหลัง Indigo-600 (`#4f46e5`), ข้อความขาว, รัศมี 8px (`rounded-lg`), Padding `8px 14px`, Transition 200ms
- **Ghost / Neutral Filter**: พื้นหลัง Slate-950, ขอบ Slate-800, ข้อความ Slate-400, Hover กลายเป็น Slate-800 พร้อมข้อความขาว

### Chip Badges
- **Status Tags**: รัศมีมนกลม (`rounded-full`), Padding `2px 8px`, ตัวอักษรขนาด 11px Monospace พร้อมสีพื้นหลังแบบโปร่งแสง 15% และขอบสีตามหมวดหมู่ (Emerald / Amber / Rose)

### Metric Comparison Cards
- พื้นผิว Slate-900/90, ขอบ Slate-800, รัศมี 16px (`rounded-2xl`), Padding 20px - 24px พร้อมเอฟเฟกต์ Gradient วงแสงเบลอบางๆ ที่มุมบนขวาเพื่อสร้างชีวิตชีวา

### Interactive Sliders & Step Conveyor
- สายพานลำดับคำใน Attention Simulator ใช้ชิปคำที่มีสีเปลี่ยนตามระดับความจำ (Retention Percentage) สะท้อนการเสื่อมของสัญญาณความจำใน LSTM อย่างชัดเจน

## Do's and Don'ts

### Do:
- **Do** ใช้ Monospace กับตัวเลขสถิติ ผลเปอร์เซ็นต์ และ ID ตัวอย่างเสมอ
- **Do** จัดวางเนื้อหาเปรียบเทียบในรูปแบบเคียงข้างกัน (Side-by-side) เสมอเมื่อพูดถึง LSTM เทียบกับ BERT
- **Do** แสดงสัดส่วนตัวอย่างจริง 500 ตัวอย่างพร้อมข้อมูล Seed 42 ในทุกจุดที่มีการอ้างอิงชุดทดสอบ
- **Do** ใส่คำอธิบายกำกับความหมายของตัวชี้วัด (Precision, Recall, F1) ควบคู่กับตัวเลขจริง

### Don't:
- **Don't** ใช้เอฟเฟกต์สีรุ้ง แอนิเมชันหวือหวาที่ไม่เกี่ยวข้องกับการอธิบายโมเดล
- **Don't** ซ่อนตัวเลขความคลาดเคลื่อนหรือจุดอ่อนของ BERT (ต้องระบุว่า BERT มีข้อผิดพลาด 72 ตัวอย่างเสมอ)
- **Don't** ใช้ฟอนต์แบบ Comic หรือฟอนต์ลายมือที่ทำลายความน่าเชื่อถือทางวิชาการ

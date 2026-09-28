---
name: Sentiment Analysis Visual Lab (RMUTL Golden Brown Edition)
description: Empirical AI evaluation dashboard in RMUTL Golden Brown university identity
colors:
  primary: "#c58a2e"
  primary-hover: "#d99f3d"
  primary-light: "#f0c674"
  primary-deep: "#8d5c1a"
  secondary-positive: "#10b981"
  secondary-positive-light: "#34d399"
  tertiary-baseline: "#d97706"
  tertiary-baseline-light: "#fbbf24"
  danger-negative: "#f43f5e"
  danger-negative-light: "#fb7185"
  neutral-bg-darkest: "#0c0a08"
  neutral-surface: "#16130f"
  neutral-surface-hover: "#221d17"
  neutral-border: "#382f25"
  neutral-border-subtle: "#262019"
  neutral-text-primary: "#fdfbf7"
  neutral-text-secondary: "#e2d7c5"
  neutral-text-muted: "#9e917f"
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
    textColor: "{colors.neutral-bg-darkest}"
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
    textColor: "{colors.primary-light}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

# Design System: Sentiment Analysis Visual Lab (RMUTL Edition)

## Overview

**Creative North Star: "The Lanna Gold Machine Learning Observatory"**

ระบบงานออกแบบนี้ได้รับการถ่ายทอดอัตลักษณ์อันทรงเกียรติของ **มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา (RMUTL)** โดยใช้ **สีน้ำตาลทอง (Golden Brown / Lanna Gold)** ซึ่งเป็นสีประจำมหาวิทยาลัย ผสานเข้ากับบรรยากาศห้องวิจัยปัญญาประดิษฐ์ระดับสากล เพื่อสะท้อนความเจริญรุ่งเรืองทางวิชาการ ความสุขุมรอบคอบ และรากเหง้าวัฒนธรรมวิศวกรรมล้านนา

พื้นหลังหลักใช้โทนสีดำช็อกโกแลตเข้มจัด (Warm Obsidian Void `#0c0a08` และ Rich Espresso Slate `#16130f`) ที่อบอุ่นและสบายตากว่าสีเทาดำสังเคราะห์ทั่วไป ตัดด้วยเส้นขอบบรอนซ์ทอง (`#382f25`) และไฮไลต์ด้วยสีน้ำตาลทองอร่าม (`#c58a2e` ถึง `#f0c674`) สร้างบรรยากาศที่น่าเกรงขาม ทรงคุณค่า และเหมาะสมอย่างยิ่งสำหรับการนำเสนอวิชาการระดับปริญญาตรีต่อ ผศ.ดร.สมนึก สุระธง

**Key Characteristics:**
- **RMUTL Golden Brown Identity**: สีน้ำตาลทองล้านนาเป็นตัวขับเคลื่อนสายตา บ่งบอกสถานะการกระทำหลัก และเป็นตัวแทนความสำเร็จของนวัตกรรม
- **Warm Obsidian Backgrounds**: พื้นหลังโทนเอสเปรสโซเข้มช่วยให้กราฟข้อมูลและตัวเลขสีทองเปล่งประกายโดยไม่แยงตา
- **Rigorous Data Presentation**: ตัวเลขสถิติ ผลลัพธ์ และสมการคณิตศาสตร์จัดแสดงด้วยฟอนต์ Monospace ชัดเจน เที่ยงตรง 100%

## Colors

สีหลักและโทนของระบบถูกคัดสรรจากสีประจำมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่

### Primary
- **RMUTL Golden Brown (สีน้ำตาลทอง มทร.ล้านนา)** (`#c58a2e` / hover `#d99f3d` / light `#f0c674` / deep `#8d5c1a`): สีหลักของระบบ ใช้สำหรับสถาปัตยกรรมทรานส์ฟอร์เมอร์ (BERT), แถบนำทางที่เลือก (Active Tabs), ปุ่มกดหลัก, และตัวเลขการปรับปรุงความถูกต้อง (+30.40%)

### Secondary
- **Empirical Emerald** (`#10b981` / light `#34d399`): ตัวแทนของความถูกต้อง (Correct Predictions) และความรู้สึกเชิงบวก (Positive Sentiment)
- **Recurrent Bronze (ทองแดงรมดำ / ส้มอำพันเข้ม)** (`#d97706` / light `#fbbf24`): ตัวแทนของสถาปัตยกรรมดั้งเดิม (LSTM Baseline) เพื่อสื่อถึงเทคโนโลยียุคก่อตั้ง

### Tertiary
- **Fault Crimson** (`#f43f5e` / light `#fb7185`): ตัวแทนของความคลาดเคลื่อน (Misclassifications) และความรู้สึกเชิงลบ (Negative Sentiment)

### Neutral
- **Warm Obsidian Void** (`#0c0a08`): ระนาบพื้นหลังลึกสุด มอบความอบอุ่นลุ่มลึก
- **Rich Espresso Surface** (`#16130f`): พื้นผิวการ์ด คอนเทนเนอร์ และโมดูลวิเคราะห์
- **Elevated Bronze Slate** (`#221d17`): ระนาบยกสูงและสถานะ Hover
- **Lanna Bronze Border** (`#382f25` / subtle `#262019`): เส้นขอบสีบรอนซ์ทองโปร่งละเอียด 1px
- **Pure Cream Text** (`#fdfbf7`): ตัวอักษรหัวเรื่องและตัวเลขเด่น
- **Parchment Secondary Text** (`#e2d7c5` / muted `#9e917f`): ข้อความเนื้อหาและคำบรรยายวิชาการ

### Named Rules
**The RMUTL Gold Sovereignty Rule.** สีน้ำตาลทอง มทร.ล้านนา (`#c58a2e`) เป็นสีหลักเดียวที่บ่งบอกถึงสถานะความเป็นเลิศและจุดโฟกัสของการวิจัย ห้ามนำสีฟ้าหรือสีม่วงสังเคราะห์เข้ามาปะปนในพาเล็ตต์ เพื่อรักษาความเป็นเอกภาพของสถาบัน

## Typography

**Display & Body Font:** Modern Geometric Thai-Latin Stacks (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif`)
**Data & Metric Font:** Clean Monospace (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** สุภาพ สง่างาม น่าเชื่อถือ ผสมผสานความเป็นสถาบันการศึกษาระดับสูงเข้ากับความเฉียบคมของวิทยาการคอมพิวเตอร์

### Hierarchy
- **Display** (Bold 700, 24px - 32px, Line-height 1.25): ชื่องานวิจัยและตัวเลขสรุปความแม่นยำ (+30.40%)
- **Headline** (Bold 700, 18px - 20px, Line-height 1.3): ชื่อหัวข้อใหญ่ประจำแท็บ
- **Title** (Semi-bold 600, 14px - 16px, Line-height 1.4): ชื่อโมเดลและการ์ดย่อย
- **Body** (Regular 400, 13px - 14px, Line-height 1.6, Max 75ch): คำอธิบายผลการทดลองและการวิเคราะห์ความผิดพลาด
- **Label / Data Mono** (Semi-bold 600, 11px - 13px, Letter-spacing 0.05em): รหัสวิชา ENGCE 408, ค่าพารามิเตอร์, ตัวนับโทเคน, และสูตรคณิตศาสตร์

### Named Rules
**The Monospace Rigor Rule.** ทุกตัวเลขทางสถิติ (55.20%, 85.60%, 42.07s, 0.82s) ต้องใช้ฟอนต์ Monospace เสมอ เพื่อสะท้อนความเป็นเลิศทางวิศวกรรม

## Layout

ระบบจัดวางแบบ Responsive Fluid Grid ความกว้าง 1280px (`max-w-7xl`) พร้อม Padding ที่พอดีสายตา
- **Header Badge Banner**: แถบด้านบนแสดงรหัสวิชา ENGCE 408 และชื่อ มทร.ล้านนา บนพื้นหลังไล่ระดับน้ำตาลทอง-บรอนซ์เข้ม
- **Side-by-Side Architectural Balance**: วางเปรียบเทียบ LSTM (ซ้าย - โทนบรอนซ์ทองแดง) และ BERT (ขวา - โทนน้ำตาลทองอร่าม) อย่างสมมาตร

## Elevation & Depth

ใช้มิติแบบ **Warm Tonal Layering with Gilded Borders**:
- การ์ดทุกใบมีเส้นขอบสีบรอนซ์ทองบาง 1px (`border border-[#382f25]`)
- การ์ดที่ Active มีเงาเรืองแสงสีทองอ่อน (`box-shadow: 0 10px 20px -3px rgba(197, 138, 46, 0.25)`)
- Modal เจาะลึกตัวอย่างใช้เงาเข้มลึกตัดขาดจากระนาบพื้นหลัง

## Components

### Buttons
- **Active Tab Button**: พื้นหลังสีน้ำตาลทอง RMUTL (`#c58a2e`), ตัวอักษรสีดำเข้ม (`#0c0a08`) ให้ความเปรียบต่างสูง ชัดเจน มั่นคง, รัศมี 8px
- **Secondary / Filter Buttons**: พื้นผิว Warm Espresso (`#16130f`), ขอบสีบรอนซ์ (`#382f25`), ตัวอักษรสีครีม (`#e2d7c5`)

### Chip Badges
- **Status Tags**: รัศมีโค้งกลม (`rounded-full`), ฟอนต์ 11px Monospace พร้อมพื้นหลังสีทอง/เขียว/แดงแบบโปร่งแสง 15% และขอบสีตรงตามความหมาย

### Metric Hero Cards
- พื้นผิว Rich Espresso Slate (`#16130f`), ขอบบรอนซ์ทอง, ตกแต่งด้วยวงแสงสีทองเบลอ (Ambient Gold Glow) ที่มุมบนขวา

## Do's and Don'ts

### Do:
- **Do** ใช้สีน้ำตาลทอง RMUTL (`#c58a2e`) เป็นสี Accent หลักของระบบ
- **Do** ใช้พื้นหลังโทนอุ่น (Warm Espresso `#0c0a08` / `#16130f`) แทนสีเทาดำธรรมดา
- **Do** แสดงผลตัวเลขผลการทดลองด้วยฟอนต์ Monospace อย่างเคร่งครัด
- **Do** ระบุชื่อมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่ ให้สมเกียรติในส่วนหัวและท้าย

### Don't:
- **Don't** ใช้สีม่วงหรือสีน้ำเงินนีออนสังเคราะห์ที่ขัดแย้งกับอัตลักษณ์น้ำตาลทองของ มทร.ล้านนา
- **Don't** ปรับสีทองให้อ่อนจนเป็นสีเหลืองแสบตา (ต้องรักษาน้ำหนักสีน้ำตาลทองอันสง่างาม)
- **Don't** ใช้พื้นหลังสีขาวสว่างจ้าในส่วนจัดแสดงกราฟ

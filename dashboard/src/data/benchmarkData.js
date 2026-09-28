export const academicInfo = {
  courseCode: "ENGCE 408",
  courseName: "Introduction to Pattern Recognition (การรู้จำรูปแบบ)",
  instructor: "ผู้ช่วยศาสตราจารย์ ดร.สมนึก สุระธง",
  student: "นายชยุตม์ อยู่เจริญกิจ",
  studentId: "67543206046-4",
  section: "ENGCE408_SEC1",
  department: "สาขาวิศวกรรมไฟฟ้า (วิศวกรรมคอมพิวเตอร์) คณะวิศวกรรมศาสตร์",
  university: "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่ (RMUTL)",
  academicYear: "ภาคเรียนที่ 1 ปีการศึกษา 2569",
  titleTh: "กระบวนทัศน์ใหม่ของการรู้จำรูปแบบ: จาก LSTM สู่ Transformer",
  titleEn: "Empirical Sentiment Analysis Benchmark: LSTM vs. Fine-tuned BERT",
  dataset: "IMDb Movie Reviews (Maas et al., 2011)",
  hardware: "Google Colab (NVIDIA T4 GPU)",
};

export const hyperparameterTable = [
  {
    parameterTh: "สถาปัตยกรรมหลัก",
    parameterEn: "Primary Architecture",
    lstm: "Sequential RNN (LSTM)",
    bert: "Transformer Encoder (12-layer)",
  },
  {
    parameterTh: "กลยุทธ์การฝึก",
    parameterEn: "Training Paradigm",
    lstm: "Train from Scratch (เริ่มต้นจากศูนย์)",
    bert: "Transfer Learning (Fine-tune bert-base-uncased)",
  },
  {
    parameterTh: "มิติเวกเตอร์ (Dimension)",
    parameterEn: "Vector Dimension",
    lstm: "Embedding 128-d, Hidden 128-d",
    bert: "Hidden 768-d, [CLS] 768-d",
  },
  {
    parameterTh: "จำนวนพารามิเตอร์รวม",
    parameterEn: "Total Parameters",
    lstm: "~4,040,000 (~4.04M)",
    bert: "~110,000,000 (~110M)",
  },
  {
    parameterTh: "ขนาดแบทช์ (Batch Size)",
    parameterEn: "Batch Size",
    lstm: "32",
    bert: "16",
  },
  {
    parameterTh: "อัลกอริทึมหาค่าเหมาะสม",
    parameterEn: "Optimizer",
    lstm: "Adam (Learning Rate = 1e-3)",
    bert: "AdamW (Learning Rate = 2e-5, Weight Decay = 0.01)",
  },
  {
    parameterTh: "ฟังก์ชันสูญเสีย",
    parameterEn: "Loss Function",
    lstm: "Cross-Entropy Loss",
    bert: "Cross-Entropy Loss",
  },
  {
    parameterTh: "จำนวนรอบการฝึก (Epochs)",
    parameterEn: "Training Epochs",
    lstm: "5 รอบ",
    bert: "3 รอบ",
  },
  {
    parameterTh: "ความยาวลำดับสูงสุด",
    parameterEn: "Max Sequence Length",
    lstm: "128 โทเคน",
    bert: "128 โทเคน",
  },
  {
    parameterTh: "สภาพแวดล้อมคำนวณ",
    parameterEn: "Compute Environment",
    lstm: "Google Colab (NVIDIA T4 GPU)",
    bert: "Google Colab (NVIDIA T4 GPU)",
  },
];

export const performanceMetrics = [
  {
    metricTh: "ความถูกต้อง (Accuracy)",
    metricEn: "Accuracy",
    lstm: 55.20,
    bert: 85.60,
    delta: "+30.40%",
    unit: "%",
    winner: "bert",
    higherIsBetter: true,
  },
  {
    metricTh: "ความแม่นยำ (Precision)",
    metricEn: "Precision",
    lstm: 54.44,
    bert: 83.72,
    delta: "+29.28%",
    unit: "%",
    winner: "bert",
    higherIsBetter: true,
  },
  {
    metricTh: "ความไว (Recall)",
    metricEn: "Recall",
    lstm: 54.88,
    bert: 87.80,
    delta: "+32.92%",
    unit: "%",
    winner: "bert",
    higherIsBetter: true,
  },
  {
    metricTh: "คะแนนเฉลี่ยฮาร์มอนิก (F1-Score)",
    metricEn: "F1-Score",
    lstm: 54.66,
    bert: 85.71,
    delta: "+31.05%",
    unit: "%",
    winner: "bert",
    higherIsBetter: true,
  },
  {
    metricTh: "เวลาฝึกสอนเฉลี่ยต่อรอบ",
    metricEn: "Time per Epoch",
    lstm: 0.82,
    bert: 42.07,
    delta: "+41.25s (51.3x)",
    unit: "วินาที",
    winner: "lstm",
    higherIsBetter: false,
  },
];

export const lossProgression = [
  { epoch: "Epoch 1", lstm: 0.6976, bert: 0.4826 },
  { epoch: "Epoch 2", lstm: 0.5841, bert: 0.2450 },
  { epoch: "Epoch 3", lstm: 0.4720, bert: 0.1369 },
  { epoch: "Epoch 4", lstm: 0.3895, bert: null },
  { epoch: "Epoch 5", lstm: 0.3234, bert: null },
];

export const confusionMatrices = {
  lstm: {
    name: "LSTM Classifier (Baseline)",
    tp: 135,
    fp: 113,
    tn: 141,
    fn: 111,
    total: 500,
    accuracy: 55.20,
  },
  bert: {
    name: "BERT Classifier (Fine-tuning)",
    tp: 216,
    fp: 42,
    tn: 212,
    fn: 30,
    total: 500,
    accuracy: 85.60,
  },
};

export const radarData = [
  { metric: "Accuracy", LSTM: 55.20, BERT: 85.60, fullMark: 100 },
  { metric: "Precision", LSTM: 54.44, BERT: 83.72, fullMark: 100 },
  { metric: "Recall", LSTM: 54.88, BERT: 87.80, fullMark: 100 },
  { metric: "F1-Score", LSTM: 54.66, BERT: 85.71, fullMark: 100 },
];

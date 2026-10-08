# Sentiment Analysis: LSTM vs. BERT Evaluation Dashboard

An interactive analytical web application to visualize and compare empirical performance between a recurrent baseline (LSTM) and a fine-tuned Transformer (BERT) on binary sentiment classification using the IMDb review benchmark.

## Language

**Dataset Sample**:
An IMDb movie review text labeled with binary sentiment (Positive: 1, Negative: 0), capped at 128 tokens.
_Avoid_: Document, post, observation

**Baseline Model (LSTM Classifier)**:
A sequential recurrent neural network with a 128-dimensional embedding layer and 128 hidden units, trained from scratch.
_Avoid_: Recurrent network, simple RNN, vanilla model

**Fine-tuned Model (BERT Classifier)**:
A 12-layer Transformer Encoder (`bert-base-uncased`) with pre-trained weights, adapted with a task-specific classification head using the `[CLS]` token representation.
_Avoid_: Transformer, LLM, base model

**Context Decay**:
The structural degradation of information from early sequence positions in LSTM models when processing longer sequences.
_Avoid_: Memory loss, vanishing context, gradient forgetting

**Self-Attention Matrix**:
A pairwise matrix representing the normalized dot-product attention scores ($Q \times K^T / \sqrt{d_k}$) between all tokens in a sequence, capturing bidirectional dependencies regardless of position distance.
_Avoid_: Weight map, correlation table

**Classification Head**:
The task-specific linear projection layer applied to the 768-dimensional `[CLS]` vector, followed by Softmax, yielding class probabilities.
_Avoid_: Final layer, predictor, dense head

**Evaluation Metrics**:
The quantitative benchmarks measuring classification quality (Accuracy, Precision, Recall, F1-Score) and computational cost (Average Training Time per Epoch, Parameter Count).
_Avoid_: Scores, test results

## Subtitle Production Pipeline (DaVinci Resolve)

**3-Word Chunk**:
A semantic group of three spoken words or phrases presented together as a single visual subtitle unit.
_Avoid_: Sentence fragment, subtitle line, text block

**Active Word (Karaoke Accent)**:
The specific word within a 3-word chunk currently being vocalized, rendered in Golden Yellow (`#FFD700` / RMUTL Gold) with a subtle luminance glow.
_Avoid_: Highlighted word, active token, yellow text

**Rounded Text Box (Bounding Box)**:
A dark translucent bounding container (`rgba(15, 23, 42, 0.85)`) with smoothed rounded corners (`CornerRadius = 0.35`) framing the 3-word subtitle to ensure high legibility against diverse video backgrounds.
_Avoid_: Background rectangle, text bubble, subtitle box

**Fusion Title Template (`.setting`)**:
A reusable DaVinci Resolve macro operator installed in the `Templates/Edit/Titles` path, exposing intuitive Inspector controls for words, active state, typography, and geometry.
_Avoid_: Plugin, preset file, FX title

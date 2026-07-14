# 🚀 AI Object Detection System

An AI-powered Object Detection web application built with **React**, **FastAPI**, **YOLO (Ultralytics)**, and **OpenCV**. The application detects objects in real-time using a webcam or uploaded video files and displays the results with bounding boxes, labels, and confidence scores.

---

## 📸 Demo

> Add screenshots or GIFs here after deployment.

- Home Page
- Live Camera Detection
- Video Upload Detection
- Detection Results

---

## ✨ Features

- 🎥 Real-time object detection using webcam
- 📁 Upload videos for object detection
- 🧠 YOLO (Ultralytics) AI model
- ⚡ FastAPI backend for AI inference
- 🎯 Bounding boxes with object labels and confidence scores
- 📊 Smooth and responsive React interface
- 🔄 Frame-by-frame video processing
- 📦 REST API architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- JavaScript
- HTML5
- CSS3

### Backend
- FastAPI
- Python
- OpenCV
- NumPy
- Uvicorn

### AI & Computer Vision
- YOLO11 (Ultralytics)
- Deep Learning
- Computer Vision

---

## 📂 Project Structure

```
object-detection/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── utils/
│   ├── weights/
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml
└── README.md
```
---

## 🚀 Usage

### Live Camera Detection

1. Open the application.
2. Allow browser camera permissions.
3. Click **Start Camera**.
4. The AI model detects objects in real time.

### Video Upload Detection

1. Click **Upload Video**.
2. Select a video file.
3. Wait for processing.
4. View or download the annotated output video.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/detect/video` | Detect objects in uploaded video |
| GET | `/camera` | Real-time camera detection |

---

## 📦 Dependencies

### Backend

- FastAPI
- Ultralytics
- OpenCV
- NumPy
- Uvicorn
- Pydantic
- python-multipart

### Frontend

- React
- Material UI
- Axios

---

# Cartoonifying Web App
```
A full stack web application that allows users to upload an image and receive a cartoonified version using OpenCV- based image processing model.
The project supports real-time preview, adjustable parameters, and image download.
```

## Features
- Upload image (`.jpg`, `.png`)
- Image type and size validation
- Cartoonification using OpenCV (Python)
- Adjustable edge intensity parameter
- Before / After image preview
- Download cartoonified image
- Loading state during processing
- Graceful error handling
- Clean, responsive UI

## Tech Stack
### Frontend
- **React.js**
- **Axios** (API requests)
- **CSS** (custom styling)

### Backend
- **Node.js**
- **Express.js**
- **Multer** (multipart file uploads)
- **Child Process** (Python invocation)

### Image Processing
- **Python 3**
- **OpenCV**
- **NumPy**

## Prerequisites 
Make sure the following are installed:

- **Node.js (v16+)**
- **npm**
- **Python 3.8+**
- **pip**

## Setup
### Backend
Run these commands in terminal:
```
- cd backend
- npm install 
- express multer cors uuid
- pip install opencv-python numpy
- mkdir uploads outputs
- node server.js
```
**You should see:**
``` 
✅ Server running on http://localhost:5000
```
### Frontend
Run these commands in terminal:
```
- cd frontend
- npm install
- npm start
```
**Frontend will run at:**
```
http://localhost:3000
```

## How to use the App:
1) Open http://localhost:3000

2) Click Choose Image

3) Adjust the Edge Intensity slider

4) Click Cartoonify

5) Wait for processing

6) Preview original & cartoon image

7) Click Download
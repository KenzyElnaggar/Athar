import os
import io
import csv
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from PIL import Image
import tensorflow as tf

# --- Load Model ---
MODEL_PATH = os.path.join("models", "hiero_model.h5")  # or "models/saved_model/"
if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
else:
    raise RuntimeError(f"Model not found at {MODEL_PATH}")

# --- Load Class Map ---
CLASS_MAP_PATH = os.path.join("data", "class_map.csv")
class_id_to_label = {}
label_to_meaning = {}
with open(CLASS_MAP_PATH, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        class_id_to_label[int(row['class_id'])] = row['label']
        label_to_meaning[row['label']] = row['meaning']

# --- FastAPI App ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Image Preprocessing ---
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))  # Adjust to your model's input size
    arr = np.array(image) / 255.0
    return np.expand_dims(arr, axis=0)

# --- Prediction Endpoint ---
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image (.jpg, .png)")
    try:
        image_bytes = await file.read()
        img = preprocess_image(image_bytes)
        preds = model.predict(img)
        class_idx = int(np.argmax(preds))
        confidence = float(np.max(preds))
        label = class_id_to_label.get(class_idx, "unknown")
        meaning = label_to_meaning.get(label, "unknown")
        return JSONResponse(
            status_code=200,
            content={
                "predicted_class": label,
                "meaning": meaning,
                "confidence": round(confidence, 4)
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# --- Error Handler for No File ---
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail}) 
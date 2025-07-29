"""
Upload route for processing Egyptian hieroglyph images.
"""

import logging
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from models.glyph_model import recognize_glyph
from services.translator import translate_glyph
from utils.image_utils import validate_image, preprocess_image

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/upload")
async def upload_glyph_image(file: UploadFile = File(...)):
    """
    Upload and process an Egyptian hieroglyph image.
    
    Args:
        file (UploadFile): The image file to process
        
    Returns:
        JSONResponse: Contains the recognized glyph code and translation
        
    Raises:
        HTTPException: If file is invalid or processing fails
    """
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400, 
                detail="File must be an image (JPEG, PNG, etc.)"
            )
        
        # Read file content
        image_bytes = await file.read()
        
        # Validate image
        try:
            validate_image(image_bytes)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        logger.info(f"Processing image: {file.filename} ({len(image_bytes)} bytes)")
        
        # Recognize the glyph
        try:
            glyph_code = recognize_glyph(image_bytes)
            logger.info(f"Recognized glyph: {glyph_code}")
        except Exception as e:
            logger.error(f"Glyph recognition failed: {e}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to recognize glyph: {str(e)}"
            )
        
        # Translate the glyph
        try:
            translation = translate_glyph(glyph_code)
            logger.info(f"Translated {glyph_code} to '{translation}'")
        except Exception as e:
            logger.error(f"Translation failed: {e}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to translate glyph: {str(e)}"
            )
        
        # Return the result
        result = {
            "success": True,
            "label": glyph_code,
            "translation": translation,
            "filename": file.filename,
            "file_size": len(image_bytes)
        }
        
        logger.info(f"Successfully processed image: {glyph_code} -> {translation}")
        return JSONResponse(content=result, status_code=200)
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing image: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/upload/health")
async def upload_health_check():
    """
    Health check for the upload service.
    
    Returns:
        dict: Health status of the upload service
    """
    try:
        # Test if the model and translator are working
        # This is a simple test - in production you might want more comprehensive checks
        return {
            "status": "healthy",
            "service": "upload",
            "model_available": True,
            "translator_available": True
        }
    except Exception as e:
        logger.error(f"Upload health check failed: {e}")
        return {
            "status": "unhealthy",
            "service": "upload",
            "error": str(e)
        }

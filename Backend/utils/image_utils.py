"""
Image utility functions for processing Egyptian hieroglyph images.
"""

import io
import logging
from typing import Tuple, Optional
from PIL import Image, ImageOps

logger = logging.getLogger(__name__)

# Supported image formats
SUPPORTED_FORMATS = {'JPEG', 'JPG', 'PNG', 'BMP', 'TIFF', 'WEBP'}
MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB
MIN_IMAGE_SIZE = 1024  # 1KB
MAX_DIMENSIONS = (4096, 4096)  # Max width/height
MIN_DIMENSIONS = (32, 32)  # Min width/height

def validate_image(image_bytes: bytes) -> None:
    """
    Validate image bytes for processing.
    
    Args:
        image_bytes (bytes): Raw image data
        
    Raises:
        ValueError: If image is invalid or doesn't meet requirements
    """
    try:
        # Check file size
        if len(image_bytes) > MAX_IMAGE_SIZE:
            raise ValueError(f"Image file too large. Maximum size is {MAX_IMAGE_SIZE // (1024*1024)}MB")
        
        if len(image_bytes) < MIN_IMAGE_SIZE:
            raise ValueError(f"Image file too small. Minimum size is {MIN_IMAGE_SIZE // 1024}KB")
        
        # Try to open the image
        try:
            image = Image.open(io.BytesIO(image_bytes))
        except Exception as e:
            raise ValueError(f"Invalid image format: {str(e)}")
        
        # Check format
        if image.format not in SUPPORTED_FORMATS:
            raise ValueError(f"Unsupported image format: {image.format}. Supported formats: {', '.join(SUPPORTED_FORMATS)}")
        
        # Check dimensions
        width, height = image.size
        if width > MAX_DIMENSIONS[0] or height > MAX_DIMENSIONS[1]:
            raise ValueError(f"Image dimensions too large. Maximum dimensions are {MAX_DIMENSIONS[0]}x{MAX_DIMENSIONS[1]}")
        
        if width < MIN_DIMENSIONS[0] or height < MIN_DIMENSIONS[1]:
            raise ValueError(f"Image dimensions too small. Minimum dimensions are {MIN_DIMENSIONS[0]}x{MIN_DIMENSIONS[1]}")
        
        logger.info(f"Image validation passed: {image.format}, {width}x{height}, {len(image_bytes)} bytes")
        
    except ValueError:
        # Re-raise ValueError exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error validating image: {e}")
        raise ValueError(f"Failed to validate image: {str(e)}")

def preprocess_image(image_bytes: bytes, target_size: Tuple[int, int] = (224, 224)) -> bytes:
    """
    Preprocess image for model input.
    
    Args:
        image_bytes (bytes): Raw image data
        target_size (tuple): Target size (width, height) for the image
        
    Returns:
        bytes: Preprocessed image data
        
    Raises:
        ValueError: If preprocessing fails
    """
    try:
        # Open image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize image
        image = ImageOps.fit(image, target_size, method=Image.Resampling.LANCZOS)
        
        # Convert back to bytes
        output_buffer = io.BytesIO()
        image.save(output_buffer, format='JPEG', quality=95, optimize=True)
        processed_bytes = output_buffer.getvalue()
        
        logger.info(f"Preprocessed image to {target_size[0]}x{target_size[1]}, {len(processed_bytes)} bytes")
        return processed_bytes
        
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise ValueError(f"Failed to preprocess image: {str(e)}")

def get_image_info(image_bytes: bytes) -> dict:
    """
    Get information about an image.
    
    Args:
        image_bytes (bytes): Raw image data
        
    Returns:
        dict: Image information including format, size, dimensions
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        return {
            "format": image.format,
            "mode": image.mode,
            "width": image.size[0],
            "height": image.size[1],
            "file_size": len(image_bytes)
        }
    except Exception as e:
        logger.error(f"Error getting image info: {e}")
        return {"error": str(e)}

def resize_image(image_bytes: bytes, max_size: Tuple[int, int] = (800, 800)) -> bytes:
    """
    Resize image while maintaining aspect ratio.
    
    Args:
        image_bytes (bytes): Raw image data
        max_size (tuple): Maximum width and height
        
    Returns:
        bytes: Resized image data
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        
        # Calculate new size maintaining aspect ratio
        width, height = image.size
        max_width, max_height = max_size
        
        if width <= max_width and height <= max_height:
            return image_bytes  # No resize needed
        
        # Calculate scaling factor
        scale = min(max_width / width, max_height / height)
        new_size = (int(width * scale), int(height * scale))
        
        # Resize image
        image = image.resize(new_size, Image.Resampling.LANCZOS)
        
        # Convert back to bytes
        output_buffer = io.BytesIO()
        image.save(output_buffer, format=image.format or 'JPEG', quality=95)
        return output_buffer.getvalue()
        
    except Exception as e:
        logger.error(f"Error resizing image: {e}")
        return image_bytes  # Return original if resize fails

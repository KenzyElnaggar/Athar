"""
Translation service for Egyptian hieroglyphs.
Maps glyph codes to English translations using a JSON mapping file.
"""

import json
import logging
import os
from typing import Dict, Optional

logger = logging.getLogger(__name__)

# Cache for the mapping data
_glyph_mapping: Optional[Dict[str, str]] = None

def load_glyph_mapping() -> Dict[str, str]:
    """
    Load glyph code to English translation mapping from JSON file.
    
    Returns:
        Dict[str, str]: Mapping of glyph codes to English translations
        
    Raises:
        FileNotFoundError: If mapping.json is not found
        json.JSONDecodeError: If mapping.json is invalid JSON
    """
    global _glyph_mapping
    
    if _glyph_mapping is not None:
        return _glyph_mapping
    
    try:
        # Get the directory where this file is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # Navigate to the data directory
        data_dir = os.path.join(current_dir, "..", "data")
        mapping_file = os.path.join(data_dir, "mapping.json")
        
        with open(mapping_file, 'r', encoding='utf-8') as f:
            _glyph_mapping = json.load(f)
            
        logger.info(f"Loaded {len(_glyph_mapping)} glyph translations")
        return _glyph_mapping
        
    except FileNotFoundError:
        logger.error(f"Mapping file not found: {mapping_file}")
        raise FileNotFoundError(f"Glyph mapping file not found: {mapping_file}")
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in mapping file: {e}")
        raise json.JSONDecodeError(f"Invalid JSON in mapping file: {e}")
    except Exception as e:
        logger.error(f"Error loading glyph mapping: {e}")
        raise RuntimeError(f"Failed to load glyph mapping: {e}")

def translate_glyph(glyph_code: str) -> str:
    """
    Translate a glyph code to its English meaning.
    
    Args:
        glyph_code (str): The glyph code (e.g., "G17", "A1")
        
    Returns:
        str: English translation of the glyph
        
    Raises:
        KeyError: If glyph code is not found in mapping
    """
    try:
        mapping = load_glyph_mapping()
        
        if glyph_code not in mapping:
            logger.warning(f"Unknown glyph code: {glyph_code}")
            return f"Unknown glyph: {glyph_code}"
        
        translation = mapping[glyph_code]
        logger.info(f"Translated {glyph_code} to '{translation}'")
        return translation
        
    except Exception as e:
        logger.error(f"Error translating glyph {glyph_code}: {e}")
        raise RuntimeError(f"Failed to translate glyph {glyph_code}: {e}")

def get_all_glyphs() -> Dict[str, str]:
    """
    Get all available glyph translations.
    
    Returns:
        Dict[str, str]: All glyph codes and their translations
    """
    try:
        return load_glyph_mapping()
    except Exception as e:
        logger.error(f"Error getting all glyphs: {e}")
        return {}

def is_valid_glyph_code(glyph_code: str) -> bool:
    """
    Check if a glyph code exists in the mapping.
    
    Args:
        glyph_code (str): The glyph code to check
        
    Returns:
        bool: True if the glyph code exists, False otherwise
    """
    try:
        mapping = load_glyph_mapping()
        return glyph_code in mapping
    except Exception:
        return False
